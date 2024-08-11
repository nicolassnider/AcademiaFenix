import 'cropperjs/dist/cropper.css';

import { Cropper } from 'react-cropper';

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
}

function PhotoWidgetCropper({ imagePreview, setCropper }: Props) {

    return (
        <Cropper
            src={imagePreview}
            style={{ height: 200, width: '100%' }}
            // Cropper.js options
            initialAspectRatio={1}
            aspectRatio={1}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => { console.log('onInitialized Cropper'); setCropper(cropper) }}
        />
    )
}

export default PhotoWidgetCropper