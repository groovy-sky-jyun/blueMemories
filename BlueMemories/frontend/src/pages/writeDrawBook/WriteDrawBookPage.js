import {Helmet} from "react-helmet";
import styled from 'styled-components';
import { WriteMenuBar } from '../../components/WriteMenuBar';

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    display: flex;
    background-color: #FBF5E4;
    flex-direction:column;
    align-items: center; /* 수직 중앙 정렬 */
`;

const BodyContainer=styled.div`
    width: 80%;
    height:100%;
    margin-bottom:1%;
    /*item정렬*/
    display: flex;
    justify-content: space-between;/* 수평  정렬 */
    flex-direction: row;
    align-items: center; /* 수직 중앙 정렬 */
`;
const BeforePageBtn = styled.button`
    background: url("/resourcesPng/writeNovelPage/beforePageBtn.png") no-repeat;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    height: 2.5vw;
    width: 2.5vw;
    /*마우스 HOVER 설정*/
    cursor: pointer;
    &:active {
        background: url("/resourcesPng/writeNovelPage/beforePageBtnActive.png") no-repeat;
        background-size: contain;
        /*크기*/
        height: 2.5vw;
        width: 2.5vw;
    }
`;
const AfterePageBtn = styled.button`
    background: url("/resourcesPng/writeNovelPage/afterPageBtn.png") no-repeat;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    height: 2.5vw;
    width: 2.5vw;
    /*마우스 HOVER 설정*/
    cursor: pointer;
    &:active {
        background: url("/resourcesPng/writeNovelPage/afterPageBtnActive.png") no-repeat;
        background-size: contain;
        /*크기*/
        height: 2.5vw;
        width: 2.5vw;
    }
`;

const WriteContainer = styled.div`
    width: 70%;
    height: 40vw;
    /*item 정렬*/
    display: flex;
    position:relative;
    justify-content: center;/* 수평  정렬 */
    align-items: center; /* 수직 중앙 정렬 */
`;
const WritePage = styled.div`
    background: url("/resourcesPng/writeDrawBookPage/whitePage.png") no-repeat center;
    background-size: contain;
    /*스타일*/
    border: none;
    /*크기*/
    width: 55vw;
    height: 40vw;
    /*레이어*/
    position:absolute;
    z-index: 1;
`;
const ImageCreateBtn = styled.div`
    background: url("/resourcesPng/writeDrawBookPage/addImageBtn.png") no-repeat;
    background-size: contain;
    /*크기*/
    height: 10%;
    width: 10%;
    /*레이어*/
    position:absolute;
    z-index: 2;
    /*위치*/
    top: 43%;
    left:22%;

`;
const WriteDrawBookForm = () => {
    return (
        <div>
            <Helmet>
                <title>WriteDrawBook</title>
                <meta name="description" content="BlueMemories WriteNovel Page"/>
            </Helmet>

            <Wrapper>
                <WriteMenuBar></WriteMenuBar>
                <BodyContainer>
                    <BeforePageBtn></BeforePageBtn>
                    <WriteContainer>
                        <WritePage></WritePage>
                        <ImageCreateBtn></ImageCreateBtn>

                    </WriteContainer>
                    <AfterePageBtn></AfterePageBtn>
                </BodyContainer>
            </Wrapper>
        </div>
    );
};

export default WriteDrawBookForm;
