// Product catalog data in Hindi

export const STORE_CONFIG = {
    name: 'हनुमान सेतु',
    tagline: 'पवित्र भक्ति सामग्री',
    whatsappNumber: '919598819664',
    upiId: 'your-upi@bank',
    currency: '₹',
    instagram: '',
    email: 'contact@hanumansetu.com',
};

export const products = [
    {
        id: 1,
        name: 'हनुमान जी संगमरमर की मूर्ति',
        slug: 'hanuman-ji-marble-murti',
        category: 'मूर्ति',
        price: 2499,
        originalPrice: 3499,
        description:
            'प्रीमियम सफेद संगमरमर में उत्कृष्ट हस्तनिर्मित हनुमान जी की मूर्ति। कुशल कारीगरों द्वारा सावधानीपूर्वक उकेरा गया प्रत्येक टुकड़ा बजरंग बली के दिव्य सार को दर्शाता है। आपके घर के मंदिर या पवित्र उपहार के लिए एकदम सही।',
        features: [
            'प्रीमियम सफेद संगमरमर',
            'गैर विषैले रंगों से हाथ से रंगा हुआ',
            'ऊंचाई: 12 इंच',
            'वजन: ~2.5 किलो',
            'मखमली आधार के साथ',
        ],
        tag: 'सबसे ज्यादा बिकने वाला',
        image: '/assets/product-1.png',
        images: [
            '/assets/product-1.png',
            '/assets/product-1-alt-1.png',
            '/assets/product-1-alt-2.png',
            '/assets/product-1-alt-3.png'
        ],
        rating: 4.9,
        reviewCount: 124,
        reviews: [
            { id: 1, user: 'राजेश कुमार', rating: 5, comment: 'अद्भुत गुणवत्ता! मूर्ति बहुत ही सुंदर और जीवंत लगती है।' },
            { id: 2, user: 'सुनीता शर्मा', rating: 4, comment: 'पैकेजिंग बहुत अच्छी थी। मूर्ति का विवरण बहुत सुंदर है।' }
        ]
    },
    {
        id: 2,
        name: 'पीतल की पूजा थाली सेट',
        slug: 'brass-pooja-thali-set',
        category: 'पूजा सामग्री',
        price: 1299,
        originalPrice: 1799,
        description:
            'जटिल रूप से उभरे हुए पारंपरिक डिजाइनों के साथ पूर्ण पीतल पूजा थाली सेट। इसमें थाली, दीया, अगरबत्ती स्टैंड, कुमकुम-चावल का डिब्बा और घंटी शामिल है। दैनिक पूजा और त्योहारों के लिए आवश्यक।',
        features: [
            'शुद्ध पीतल',
            'पारंपरिक उभरे हुए पैटर्न',
            '5 टुकड़ों का सेट',
            'व्यास: 10 इंच',
            'खराब न होने वाली फिनिश',
        ],
        tag: 'लोकप्रिय',
        image: '/assets/product-2.png',
        rating: 4.7,
        reviewCount: 86,
        reviews: [
            { id: 1, user: 'अमित मिश्रा', rating: 5, comment: 'पीतल बहुत ही चमक वाला और मजबूत है।' },
            { id: 2, user: 'प्रियंका', rating: 4, comment: 'अच्छी थाली है, रोज़ाना पूजा के लिए बेहतरीन।' }
        ]
    },
    {
        id: 3,
        name: 'रुद्राक्ष माला (108 दाने)',
        slug: 'rudraksha-mala-108',
        category: 'आध्यात्मिक',
        price: 899,
        originalPrice: 1299,
        description:
            '108 हाथ से बंधे दानों के साथ प्रामाणिक 5 मुखी रुद्राक्ष माला। नेपाल से प्राप्त, प्रत्येक दाना प्राकृतिक रूप से उगाया और ऊर्जित किया जाता है। जप ध्यान और आध्यात्मिक अभ्यास के लिए आदर्श।',
        features: [
            'असली 5 मुखी रुद्राक्ष',
            '108 + 1 गुरु दाना',
            'रेशमी धागे से हाथ से गुंथा हुआ',
            'दाने का आकार: 8-9mm',
            'प्रमाणिकता का प्रमाण पत्र',
        ],
        tag: null,
        image: '/assets/product-3.png',
        rating: 4.8,
        reviewCount: 210,
        reviews: [
            { id: 1, user: 'विकास', rating: 5, comment: 'एकदम शुद्ध और असली रुद्राक्ष। जप के लिए बहुत अच्छा।' },
            { id: 2, user: 'नेहा', rating: 5, comment: 'बहुत ही शांतिपूर्ण ऊर्जा महसूस होती है।' }
        ]
    },
    {
        id: 4,
        name: 'चंदन अगरबत्ती गिफ्ट बॉक्स',
        slug: 'sandalwood-incense-gift-box',
        category: 'पूजा सामग्री',
        price: 599,
        originalPrice: 899,
        description:
            'एक सुंदर उपहार बॉक्स में प्रीमियम चंदन की अगरबत्ती। शुद्ध चंदन पाउडर और आवश्यक तेलों के साथ पारंपरिक तरीकों से हाथ से रोल की गई। ध्यान और पूजा के लिए एक दिव्य वातावरण बनाती है।',
        features: [
            'शुद्ध चंदन की खुशबू',
            'प्रति बॉक्स 100 अगरबत्ती',
            'जलने का समय: 45 मिनट प्रत्येक',
            'हाथ से रोल की गई, रसायन मुक्त',
            'सुंदर उपहार पैकेजिंग',
        ],
        tag: 'नया',
        image: '/assets/product-4.png',
        rating: 4.6,
        reviewCount: 45,
        reviews: [
            { id: 1, user: 'संजय', rating: 4, comment: 'खुशबू बहुत ही मनमोहक है।' },
            { id: 2, user: 'मीना', rating: 5, comment: 'उपहार देने के लिए बहुत बढ़िया विकल्प।' }
        ]
    },
    {
        id: 5,
        name: 'तांबे का पंचपात्र सेट',
        slug: 'copper-panchpatra-set',
        category: 'पूजा सामग्री',
        price: 799,
        originalPrice: 1199,
        description:
            'दैनिक पूजा अनुष्ठानों के लिए पारंपरिक तांबे का पंचपात्र (आचमनी सेट)। मिरर-पॉलिश फिनिश के साथ शुद्ध तांबे से तैयार किया गया। पात्र और चम्मच शामिल हैं। तांबे को इसके शुद्ध गुणों के लिए वैदिक परंपरा में पूजा जाता है।',
        features: [
            'शुद्ध तांबा',
            'मिरर-पॉलिश फिनिश',
            'पात्र और चम्मच शामिल',
            'ऊंचाई: 4 इंच',
            'आयुर्वेदिक स्वास्थ्य लाभ',
        ],
        tag: null,
        image: '/assets/product-5.png',
        rating: 4.5,
        reviewCount: 32,
        reviews: [
            { id: 1, user: 'राहुल', rating: 5, comment: 'तांबा शुद्ध है। बहुत ही अच्छी चमक है।' },
            { id: 2, user: 'गीता', rating: 4, comment: 'उपयोग करने में आसान और सुंदर।' }
        ]
    },
    {
        id: 6,
        name: 'चांदी के गणेश जी की मूर्ति',
        slug: 'silver-ganesha-idol',
        category: 'मूर्ति',
        price: 1899,
        originalPrice: 2499,
        description:
            'लकड़ी के आधार पर प्रीमियम चांदी की परत वाली गणेश जी की मूर्ति। सूक्ष्म कारीगरी और भव्य विवरण इसे आपके मंदिर के लिए एक उत्कृष्ट विकल्प बनाते हैं।',
        features: [
            'चांदी की परत (Silver Plated)',
            'लकड़ी का प्रीमियम आधार',
            'ऊंचाई: 6 इंच',
            'स्थायी फिनिश',
            'सुंदर बॉक्स पैकेजिंग',
        ],
        tag: 'नया',
        image: '/assets/product-6.png',
        rating: 4.8,
        reviewCount: 38,
        reviews: [
            { id: 1, user: 'विजय', rating: 5, comment: 'बहुत ही सुंदर और प्रीमियम क्वालिटी।' },
            { id: 2, user: 'मनीषा', rating: 5, comment: 'मंदिर में रखने के लिए सबसे अच्छा उत्पाद।' }
        ]
    },
    {
        id: 7,
        name: 'केसरिया रामनामी दुपट्टा',
        slug: 'saffron-prayer-shawl',
        category: 'आध्यात्मिक',
        price: 499,
        originalPrice: 799,
        description:
            'शुद्ध सूती केसरिया रामनामी दुपट्टा, जिस पर सुंदर सुलेख में "जय श्री राम" छपा है। यह कोमल और पारंपरिक वस्त्र पूजा और धार्मिक अनुष्ठानों के लिए आदर्श है।',
        features: [
            '100% शुद्ध कपास',
            'जय श्री राम प्रिंट',
            'आकार: 2 मीटर',
            'त्वचा के अनुकूल कपड़े',
            'धोने के बाद भी रंग नहीं जाता',
        ],
        tag: 'लोकप्रिय',
        image: '/assets/product-7.png',
        rating: 4.7,
        reviewCount: 92,
        reviews: [
            { id: 1, user: 'अजय', rating: 5, comment: 'कपड़ा बहुत ही मुलायम और आरामदायक है।' },
            { id: 2, user: 'दिनेश', rating: 4, comment: 'प्रिंट की गुणवत्ता बहुत अच्छी है।' }
        ]
    },
    {
        id: 8,
        name: 'स्फटिक शिवलिंग (शुद्ध क्रिस्टल)',
        slug: 'crystal-quartz-shivling',
        category: 'मूर्ति',
        price: 1299,
        originalPrice: 1999,
        description:
            'प्राकृतिक स्फटिक (क्रिस्टल) से बना शुद्ध शिवलिंग। यह पारदर्शिता और आध्यात्मिक ऊर्जा का प्रतीक है। भगवान शिव की शांतिपूर्ण पूजा के लिए अत्यंत शुभ।',
        features: [
            'प्राकृतिक स्फटिक क्रिस्टल',
            'अत्यधिक पारदर्शी',
            'आकार: 3 इंच',
            'नकारात्मक ऊर्जा को दूर करता है',
            'प्रामाणिकता गारंटी',
        ],
        tag: null,
        image: '/assets/product-8.png',
        rating: 4.9,
        reviewCount: 56,
        reviews: [
            { id: 1, user: 'शिवानी', rating: 5, comment: 'एकदम पारदर्शी और असली स्फटिक। बहुत ऊर्जावान महसूस होता है।' },
            { id: 2, user: 'नितिन', rating: 5, comment: 'अद्भुत उत्पाद, घर के लिए बहुत शुभ।' }
        ]
    },
    {
        id: 9,
        name: 'डिजाइनर मयूर पीतल दीया (4 का सेट)',
        slug: 'designer-peacock-brass-diya',
        category: 'पूजा सामग्री',
        price: 699,
        originalPrice: 999,
        description:
            'मयूर की सुंदर नक्काशी वाले 4 डिजाइनर पीतल दीयों का सेट। दीपावली और विशेष पूजा के लिए आपके मंदिर की शोभा बढ़ाने के लिए एकदम सही।',
        features: [
            'उच्च गुणवत्ता वाला पीतल',
            'मयूर (मोर) डिजाइन',
            '4 दीयों का पैक',
            'चमकदार पॉलिश',
            'उपहार देने के लिए सर्वोत्तम',
        ],
        tag: 'तौहफा',
        image: '/assets/product-9.png',
        rating: 4.6,
        reviewCount: 29,
        reviews: [
            { id: 1, user: 'सपना', rating: 5, comment: 'उपहार देने के लिए खरीदे, सबने बहुत पसंद किए।' },
            { id: 2, user: 'आनंद', rating: 4, comment: 'डिजाइन बहुत ही क्लासिक और सुंदर है।' }
        ]
    },
    {
        id: 10,
        name: 'प्राकृतिक तुलसी जप माला',
        slug: 'natural-tulsi-japa-mala',
        category: 'आध्यात्मिक',
        price: 399,
        originalPrice: 599,
        description:
            '108 दानों वाली असली तुलसी की जप माला। लाल धागे और रेशमी फुंदने के साथ हाथ से तैयार की गई। जप और ध्यान में एकाग्रता बढ़ाने के लिए।',
        features: [
            'असली लकड़ी की तुलसी',
            '108 दाने + 1 मुख्य दाना',
            'हाथ से बनी गांठें',
            'लंबाई: ~32 इंच',
            'पवित्र जप के लिए उत्तम',
        ],
        tag: null,
        image: '/assets/product-10.png',
        rating: 4.8,
        reviewCount: 145,
        reviews: [
            { id: 1, user: 'प्रशांत', rating: 5, comment: 'तुलसी की लकड़ी की खुशबू बहुत अच्छी है।' },
            { id: 2, user: 'कविता', rating: 5, comment: 'जप के लिए बहुत ही आरामदायक माला।' }
        ]
    },
    {
        id: 11,
        name: 'गोमती चक्र समृद्धि बाउल',
        slug: 'gomati-chakra-bowl',
        category: 'आध्यात्मिक',
        price: 549,
        originalPrice: 849,
        description:
            'सुंदर पीतल की कटोरी में रखे प्राकृतिक सफेद गोमती चक्र। माना जाता है कि इसे घर/दुकान की तिजोरी में रखने से सुख-समृद्धि और सुरक्षा आती है।',
        features: [
            'प्राकृतिक गोमती चक्र',
            'पॉलिश किया हुआ पीतल बाउल',
            '11 चक्रों का सेट',
            'धन और समृद्धि के लिए शुभ',
            'प्रामाणिक प्राकृतिक स्रोत',
        ],
        tag: 'लोकप्रिय',
        image: '/assets/product-11.png',
        rating: 4.7,
        reviewCount: 63,
        reviews: [
            { id: 1, user: 'महेश', rating: 5, comment: 'चक्र असली हैं और पीतल का बाउल भी बहुत अच्छा है।' },
            { id: 2, user: 'मीनू', rating: 4, comment: 'घर में रखने के बाद बहुत शांति महसूस हो रही है।' }
        ]
    }
];

export function getProductBySlug(slug) {
    return products.find((p) => p.slug === slug);
}

export function formatPrice(price) {
    return `${STORE_CONFIG.currency}${price.toLocaleString('en-IN')}`;
}
