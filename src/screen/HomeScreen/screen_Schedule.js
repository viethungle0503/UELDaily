import { useEffect, useState } from 'react';
import {
    Image,
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    ScrollView,

} from 'react-native';

export default function Schedule() {
    const cheerio = require('cheerio');
    const [temp, setTemp] = useState();
    useEffect(() => {
        setTemp(loadloadGraphicCards());
        console.log(temp);
    }, [])
    async function loadloadGraphicCards(page = 1) {
        const searchUrl = `https://is.uel.edu.vn/tin-tuc-34`;
        const response = await fetch(searchUrl);   // fetch page
        const htmlString = await response.text();  // get response text
        const $ = cheerio.load(htmlString);           // parse HTML string
        return $(".title_topicdisplay"); // select result <li>s
        
    }
    return (
        <View>
        </View>
    )
}