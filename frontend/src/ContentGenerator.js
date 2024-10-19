import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import "./ContentGenerator.css"

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

const ContentGenerator = () => {
  const [basicInfo, setBasicInfo] = useState('');
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateContent = async () => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      
      const prompt = `Generate social media content based on the following information: ${basicInfo}
      Please provide:
      1. An Instagram caption (including relevant hashtags)
      2. A Twitter post (including relevant hashtags)
      3. A detailed prompt for image generation. This prompt should be very descriptive and specific, designed to generate a high-quality, relevant image. Include details about style, mood, colors, composition, and any specific elements that should be in the image.
      
      Format the response as a JSON object with keys: instagramCaption, twitterCaption, imagePrompt`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      const content = parseResponse(text);
      const imageUrl = await generateImage(content.imagePrompt);
      content.imageUrl = imageUrl;
      delete content.imagePrompt;
      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateImage = async (prompt) => {
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 30,
          samples: 1,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }

    const responseJSON = await response.json();
    return `data:image/png;base64,${responseJSON.artifacts[0].base64}`;
  };

  const parseResponse = (text) => {
    const jsonStr = text.replace(/```json\n|\n```/g, '').trim();
    try {
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      const instagramCaption = extractContent(text, 'Instagram caption');
      const twitterCaption = extractContent(text, 'Twitter post');
      const imagePrompt = extractContent(text, 'prompt for image generation');
      return { instagramCaption, twitterCaption, imagePrompt };
    }
  };

  const extractContent = (text, key) => {
    const regex = new RegExp(`${key}[:\\s]+(.*?)(?=\\n\\d\\.|\n$)`, 'is');
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const downloadImage = (imageUrl) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Content Generator</h1>
      <textarea
        value={basicInfo}
        onChange={(e) => setBasicInfo(e.target.value)}
        placeholder="Enter basic info about your post..."
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        rows={4}
      />
      <button 
        onClick={generateContent} 
        disabled={isLoading}
        style={{
          width: '100%',
          padding: '0.5rem',
          backgroundColor: isLoading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          marginBottom: '1rem'
        }}
      >
        {isLoading ? 'Generating...' : 'Generate Content'}
      </button>
      {generatedContent && (
        <div>
          <div style={{ marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Instagram Caption</h2>
            <p>{generatedContent.instagramCaption}</p>
            <button 
              onClick={() => copyToClipboard(generatedContent.instagramCaption)}
              style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Copy Instagram Caption
            </button>
          </div>
          <div style={{ marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Twitter Caption</h2>
            <p>{generatedContent.twitterCaption}</p>
            <button 
              onClick={() => copyToClipboard(generatedContent.twitterCaption)}
              style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Copy Twitter Caption
            </button>
          </div>
          <div style={{ marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px', padding: '1rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Generated Image</h2>
            {generatedContent.imageUrl && (
              <>
                <img src={generatedContent.imageUrl} alt="Generated content" style={{ width: '100%', height: 'auto' }} />
                <button 
                  onClick={() => downloadImage(generatedContent.imageUrl)}
                  style={{ marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Download Image
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
