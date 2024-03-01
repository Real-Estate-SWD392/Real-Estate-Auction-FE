import React, { useCallback, useState } from "react";
import ReactSimpleImageViewer from "react-simple-image-viewer";

const TestComponent = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const images = [
    "https://i.pinimg.com/564x/29/06/66/2906662076e6deca9cfecee295099cff.jpg",
    "https://i.pinimg.com/564x/0f/8b/a5/0f8ba5b8d78ed7c43ababd190aafb282.jpghttps://i.pinimg.com/564x/0f/8b/a5/0f8ba5b8d78ed7c43ababd190aafb282.jpg",
    "https://i.pinimg.com/236x/f8/b8/fb/f8b8fb2a3a93ea8844530d26928f19b7.jpg",
    "https://i.pinimg.com/236x/fe/26/cc/fe26cc69e593fa5b9a990a897eb6ff29.jpg",
  ];

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div>
      {images.map((src, index) => (
        <img
          src={src}
          onClick={() => openImageViewer(index)}
          width="300"
          key={index}
          style={{ margin: "2px" }}
          alt=""
        />
      ))}

      {isViewerOpen && (
        <ReactSimpleImageViewer
          src={images}
          currentIndex={currentImage}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
        />
      )}
    </div>
  );
};

export default TestComponent;
