import { Button, Grid, Header } from "semantic-ui-react"
import { useEffect, useState } from "react"

import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone"

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

function PhotoUploadWidget({ loading, uploadPhoto }: Props) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas()
                .toBlob(blob => {
                    uploadPhoto(blob!);
                });
        }
    }
    useEffect(() => {
        console.log('useEffect PhotoUloadWidget')
        return () => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])
    return (
        <Grid>
            <Grid.Column width={4}>
                <Header
                    color='teal'
                    content='Step 1 - Add Photo' />
                <PhotoWidgetDropzone
                    setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column
                width={1} />
            <Grid.Column
                width={4}>
                <Header
                    color='teal'
                    content='Step 2 - Resize image' />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper
                        setCropper={setCropper}
                        imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column
                width={1} />
            <Grid.Column
                width={4}>
                <Header
                    color='teal'
                    content='Step 3 - Preview & Upload' />
                {files && files.length > 0 && (
                    <>
                        <div
                            className='img-preview'
                            style={{ minHeight: 200, overflow: 'hidden' }} />
                        <Button.Group>
                            <Button
                                loading={loading}
                                positive
                                icon='check'
                                onClick={onCrop} />
                            <Button
                                disabled={loading}
                                icon='close'
                                onClick={() => setFiles([])} />
                        </Button.Group>
                    </>
                )}

            </Grid.Column>
        </Grid>
    )
}

export default PhotoUploadWidget