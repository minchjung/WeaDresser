import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { TabBody,
    DateDataBar,
    WeatherIcon,
    RecordContainer,
    ImageBox,
    ContentBox,
    HashtagBox,
    DotMenuBox,
    DotMenu,
    SlideContainer,
    Button as PrecButton,
    Button2 as NextButton,
    BOX,
    DotMenuButton1,
    DotMenuButton2,
    DotMenuButton3,
} from './DiaryPageStyle';
import DeleteDiaryModal from '../../components/Modal/DeleteDiaryModal';
import { recordDataHandler } from '../../redux/actions/actions';
import EditRecord from '../../components/EditRecord/EditRecord';
import DatePicker from '../../components/DatePicker/DatePicker';
import sun from '../../images/sun.png';
import cloud from '../../images/cloud.png';
import moon from '../../images/moon.png';
import rain from '../../images/rain.png';
import snow from '../../images/snow.png';
import 뽀시 from '../../images-dummy(추후삭제)/뽀시.jpeg';
import 군침이 from '../../images-dummy(추후삭제)/군침이.jpeg';
import 군침이2 from '../../images-dummy(추후삭제)/군침이2.jpeg';


function DiaryPage() {

}

export default DiaryPage
