import { Header, Icon } from 'semantic-ui-react';

import  { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFiles: (files: any) => void;
}
function PhotoWidgetDropzone({ setFiles }: Props) {
    const dzStyles = {
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        // eslint-disable-next-line @typescript-eslint/prefer-as-const
        textAlign: 'center' as 'center',
        height: 200
    }
    const dzActive = {
        borderColor: 'green'
    }
    const onDrop = useCallback((acceptedFiles: object[]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFiles(acceptedFiles.map((file: any) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })))

    }, [setFiles])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()}
            style={
                isDragActive
                ? {...dzStyles, ...dzActive}
                : dzStyles
        }>
            <input {...getInputProps()} />
            <Icon name='upload' size='huge'/>
            <Header content='drop image here'/>

        </div>
    )
}

export default PhotoWidgetDropzone