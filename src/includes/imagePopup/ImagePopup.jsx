import React, { useState } from 'react';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Lightbox from "yet-another-react-lightbox";



function ImagePopup({images}) {
    const [advancedExampleOpen, setAdvancedExampleOpen] = useState(false);

  return (
  <>
     <Lightbox
        open={advancedExampleOpen}
        close={() => setAdvancedExampleOpen(false)}
        slides={images}
      />
      <img src={images?.[0]?.src}  width={50} height={50} onClick={() => setAdvancedExampleOpen(true)} style={{cursor:"pointer"}} />
  </>
  );
}

export default ImagePopup;

