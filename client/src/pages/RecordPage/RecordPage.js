import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Container, 
    RecordContainer, 
    ImageUploadBox, 
    ContentBox, 
    UploadButton,
    HashtagBox
} from './RecordPageStyle';

function RecordPage() {

    const dispatch = useDispatch();
    const inputValue = useRef(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [inputContent, setInputContent] = useState('');
    const [inputHashtag, setInputHashtag] = useState('');

    function inputFileHandler (inputValue, setUploadImage) {
        const image = inputValue.current.files;
        setUploadImage(image[0]);
        console.log('rererere', inputValue)
    }

    function inputBtn(e, inputValue) {
        e.preventDefault();
        inputValue.current.click();
    }

    function contentFn (e) {
        setInputContent(e.target.value);
        console.log(e.target.value);
    }

    function hashtagFn (e) { // 해시태그 입력함수
        if (e.target.value === '') return;
        else if (inputHashtag.includes(e.target.value)) return;
        else setInputHashtag([...inputHashtag, `#${e.target.value.split(' ').join('')}`]);
        e.target.value = '';
    }

    function removeHashtag (removeIdx) { // 해시태그 삭제함수
        const newInputHashtag = inputHashtag.filter((a, idx) => {
            return idx !== removeIdx;
        });
        setInputHashtag(newInputHashtag);
    }

    function isShareCheck () {
        setSharePost(!sharePost);
        console.log('받지?', sharePost);
    }

    function submitFn (e) { // 작성완료 버튼
        // user 정보도 담아서 줘야하지 않을까 window.sesstionStorage.getItem() 
        // 아니면 server에서 쿠키에 담긴 데이터? // 위 처럼 보내지 않고 server에서 쿠키사용
        formData.append('weatherData', weatherData);
        formData.append('image', uploadImage);
        formData.append('content', inputContent);
        formData.append('hashtag', inputHashtag);
        formData.append('share', sharePost);

        // const url = process.env.REACT_APP_SERVER_URL || 
        const url = 'http://localhost:80/diary' // server랑 확인할때 환경변수 x
        axios.post(url, formData, { 
            headers: {
                'content-type': 'multipart/form-data'
            }},
            { withCredential: true 
        })
            .then(res => {console.log('submit successfully')}) // axios.post면 res를 보내 줄 필요가 없는지?
            .catch(err => {console.log(err)});
            // history -> diary페이지 -> 다시 get요청 (가장 최신 글)
        history.push('/mypage/diary');
    }

    function cancleFn (e) {
        // formData 초기화
        formData.delete('weatherData');
        formData.delete('image');
        formData.delete('content');
        formData.delete('hashtag');
        formData.delete('share');
        history.push('/');
    }

    return (
        <Container>
            <RecordContainer>
                 <div className="content">
                    <div className="content-head">글 작성</div>
                    <ContentBox value={inputContent} onChange={(e) => contentFn(e)} placeholder="글 작성 되는곳 .."></ContentBox>
                    <HashtagBox value={inputHashtag} onChange={(e) => hashtagFn(e)} placeholder="해시태그.."></HashtagBox>
                </div>
                <div className="content">
                    <div className="content-head">이미지 업로드</div>
                    <ImageUploadBox>
                        <input 
                            name="image" 
                            className="input-blind" 
                            ref={inputValue} 
                            type="file"
                            onChange={(e) => inputFileHandler(inputValue, setUploadImage)} 
                        />
                        {
                            uploadImage ? 
                            <div 
                                className="img-preview" 
                                onClick={(e) => inputBtn(e, inputValue)} 
                                style={{ backgroundImage: `url('${URL.createObjectURL(uploadImage)}')`}}
                            >
                            </div> 
                            :
                            <div 
                                className="img-preview" 
                                onClick={(e) => inputBtn(e, inputValue)}
                            >
                                <div className="photo-logo"></div>
                            </div>
                        }
                    </ImageUploadBox>
                    <UploadButton><div>작성완료</div></UploadButton>
                </div>
            </RecordContainer>
        </Container>
    )
}

export default RecordPage
