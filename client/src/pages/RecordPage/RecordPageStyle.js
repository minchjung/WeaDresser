import styled from 'styled-components';
import photo from '../../images/photo.png'

export const Container = styled.div` 
    width: 100%; 
    height: 100vh; 
    position: relative;
    top: 0;
    left: 0;
    box-sizing: border-box;
    background-size: cover;
    background-position: center;
    background-color: #eceaf5;
`
export const RecordContainer = styled.div`
    width: 80%; 
    height: 80%; 
    position: absolute;
    display: flex;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    
    .content-left {
        width: 52em;
        min-height: 51em;
        border-radius: 4px;
        border: solid 1px #ddd;
        background-color: #fff;
        text-align: center;
    }
    .content-right {
        width: 47em;
        height: 40em;
        border-radius: 4px;
        border: solid 1px #ddd;
        background-color: #fff;
        text-align: center;
        margin-left: 0.5em;
    }
    .content-head {
        height: 8%;
        font-family: NotoSansKR;
        font-size: 20px;
        line-height: 1.2;
        color: #17191d;
        text-align: center;
        padding-top: 5%;
        font-weight: bold;
        letter-spacing: 0.1em;
    }
`
export const RecordForm = styled.form`
    display: flex;
`
export const ContentBox = styled.textarea`
    padding-left: 10px;
    padding-top: 5px;
    width: 40%;
    height: 60%;
    left: 0;
    position: absolute;
    background: beige;
    align-items: center;
    border: none;
    resize: none;
    font-size: 2em;
    letter-spacing: 2px;
`

export const HashtagBox = styled.ul`
    margin: 1em auto;
    width: 43rem;
    height: 11rem;
    padding: 0.5em 1em 0.5em 1em;
    background-color: #f9f9fb;
    align-items: center;
    border: none;
    resize: none;
    padding-left: 10px;
    padding-top: 5px;
    font-size: 2em;
    letter-spacing: 2px;
    color: #93969b;
    overflow-y: auto;
    display: flex;
    flex-wrap: wrap;
    .hashtag {
        width: auto;
        height: 2.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        padding: 0 8px;
        font-size: 1.4rem;
        list-style: none;
        border-radius: 4px;
        margin: 0 4px 4px 0;
        background-color: #5694F8;
        :hover {
            background-color: #3471d5;
        }

        .close-button {
            width: 1.2rem;
            height: 1.2rem;
            margin-left: 5px;
            margin-bottom: 1px;
            background-image: url(${close});
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            cursor: pointer;
        }
    }
    .input-tag {
        width: 41rem;
        border: none;
        resize: none;
        padding: 0.1em 0.2em 0.1em 0.5em;
        background-color: #f9f9fb;
        align-items: center;
        font-size: 1.4rem;
        letter-spacing: 2px;
        color: #93969b;
    }
`
export const ShareBox = styled.div`
    width: 46rem;
    height: 3rem;
    margin: 2em auto;
    position: relative;
    /* background-color: yellow; */
    display: flex;
    .share-check-true {
        width: 2.7rem;
        height: 2.7rem;
        background-color: #4970ed;
        background-image: url(${check});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        border: solid 1px #4970ed;
    }
    .share-check-false {
        width: 2.7rem;
        height: 2.7rem;
        background-color: #d0d0d0;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        border: solid 1px #f9f9fb;
        /* border-color: #4970ed; */
    }
    .share-desc {
        width: auto;
        margin: 0.3rem 0 0 1.5rem;
        height: 2.3rem;
        font-family: NotoSansKR;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        letter-spacing: normal;
        color: #000;

    }
`

export const ImageUploadBox = styled.div`
    width: 95%;
    height: 70%;
    position: relative;
    margin-top: 0 auto;
    left: 0%;
    background: beige;
    border-radius: 15px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .photo-logo {
        width: 30%;
        height: 30%;
        position: absolute;
        background-image: url(${photo});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    }
    .input-blind {
        display: none;
    }

    .img-preview {
        width: 100%;
        height: 100%;
        background-size: contain;
        display: block;
        background-color: #ddd;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: center;
    }
`
export const UploadButton = styled.button.attrs(props => ({
    type: "submit",
}))`
    width: 23rem;
    height: 8rem;
    top: 93%;
    right: 1%;
    position: relative;
    cursor: ${props => props.canSubmit ? 'pointer' : 'default'};
    text-align: center;
    border-radius: 10px;
    font-family: NotoSansKR;
    font-size: 2.5em;
    line-height: 3.4;
    color: #fff;
    font-weight: 500;
    letter-spacing: 5px;
    opacity: ${props => props.canSubmit ? null : '0.6'};
    background-color: ${props => props.canSubmit ? '#4970ed' : '#a6a9af'};
    :hover {
        background-color: ${props => props.canSubmit ? '#16409f' : null};
    }
`

export const CancelButton = styled.button`
    width: 23rem;
    height: 8rem;
    top: 93%;
    left: 1%;
    position: relative;
    cursor: pointer;
    text-align: center;
    border-radius: 10px;
    font-family: NotoSansKR;
    font-size: 2.5em;
    line-height: 3.4;
    color: #fff;
    font-weight: 500;
    letter-spacing: 5px;
    background-color: #7f838e;
    :hover {
        background-color: #42495a;
    }
`



