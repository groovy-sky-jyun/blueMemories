import React, { useState } from 'react';
import styled from 'styled-components';

// 파일 선택 버튼 스타일링
const FileInputButton = styled.label`
    width:94%;
    height: 3vw;
    left:0;
    margin-top:1%;
    /*도형 모양*/
    background-color: transparent;
    border-radius: 5px;
    /*item 설정*/
    position: relative;
    display: inline-block;
    flex-direction: column;
    color: #1C4E37;
    cursor: pointer;

    /*텍스트 스타일*/
    font-size: 1.7vw;
    font-family: gangwonedusaeeum, sans-serif; //대체폰트
    text-decoration:underline;
    text-decoration-color: #1C4E37;
    text-underline-offset: 5px;
    text-decoration-thickness: 1px;
    user-select: none;
    /*텍스트 위치*/
    padding-left:1.5vw;
    padding-top:0.5vw;
`;
const FileInputIconButton=styled.label`
    width:1.8vw;
    height: 2vw;
    left:42vw;
    margin-top:1%;
    /*도형 모양*/
    background: url("/resourcesPng/writeNovelPage/imageUploadBtn.png") no-repeat;
    background-size: contain;
    /*item 설정*/
    position: absolute;
    cursor: pointer;
`
// 숨겨진 실제 파일 인풋
const HiddenFileInput = styled.input`
    display: none;
`;

// // 이미지 프리뷰 스타일링
const ImagePreview = styled.img`
    max-width: 100%;
    max-height: 300px;
    margin-top: 20px;
`;

const ImageUploader = ({onImageSelected}) => {
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setImagePreviewUrl(reader.result);
            if(onImageSelected) {
                onImageSelected(reader.result);
            }
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <FileInputButton htmlFor="fileInput">Upload image</FileInputButton>
            <FileInputIconButton htmlFor="fileInput"></FileInputIconButton>
            <HiddenFileInput
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
            />
            {/*{imagePreviewUrl && <ImagePreview src={imagePreviewUrl} alt="Image preview" />}*/}
        </div>
    );
};

export default ImageUploader;