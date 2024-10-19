import React from "react";
import { useState } from "react";
import "./popupSecondSection.css";
import { IoCloseOutline } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import {BsFillPlayCircleFill} from 'react-icons/bs'

const PopupSecondSection = () => {
    const [modal, setModal] = useState(false);
    const [videoLoading, setVideoLoading] = useState(true);
    
  const openModal = () => {
    setModal(!modal);
  };

  const spinner = () => {
    setVideoLoading(!videoLoading);
  };
    return (
        <div className="modal-container">
        <button onClick={openModal} className="">
          < BsFillPlayCircleFill  id="play-button"/>
          {modal ? (
            <section className="modal__bg">
              <div className="modal__align">
                <div className="modal__content" modal={modal}>
                  <IoCloseOutline
                    className="modal__close"
                    arial-label="Close modal"
                    onClick={setModal}
                  />
                  <div className="modal__video-align">
                    {videoLoading ? (
                      <div className="modal__spinner">
                        <BiLoaderAlt
                          className="modal__spinner-style"
                          fadeIn="none"
                        />
                      </div>
                    ) : null}
                    <iframe
                      className="modal__video-style"
                      onLoad={spinner}
                      loading="lazy"
                      width="800"
                      height="500"
                      src="https://www.youtube.com/embed/iSbzh0r9IV4"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                  </div>
                </div>
              </div>
            </section>
          ) : null}
        </button>
      </div>
    )
};

export default PopupSecondSection;
