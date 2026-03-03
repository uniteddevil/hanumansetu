// Product catalog data
// Replace images, descriptions, and prices with real product info

export const STORE_CONFIG = {
    name: 'HanumanSetu',
    tagline: 'Sacred Devotional Essentials',
    whatsappNumber: '919XXXXXXXXX', // Replace with real WhatsApp number (with country code, no +)
    upiId: 'your-upi@bank', // Replace with real UPI ID
    currency: '₹',
    instagram: '',
    email: 'contact@hanumansetu.com',
};

export const products = [
    {
        id: 1,
        name: 'Hanuman Ji Marble Murti',
        slug: 'hanuman-ji-marble-murti',
        category: 'Murti',
        price: 2499,
        originalPrice: 3499,
        description:
            'Exquisitely handcrafted Hanuman Ji murti in premium white marble. Each piece is carefully sculpted by skilled artisans, capturing the divine essence of Bajrang Bali. Perfect for your home mandir or as a sacred gift.',
        features: [
            'Premium white marble',
            'Hand-painted with non-toxic colors',
            'Height: 12 inches',
            'Weight: ~2.5 kg',
            'Comes with velvet base',
        ],
        tag: 'Bestseller',
        image: '/assets/product-1.png',
    },
    {
        id: 2,
        name: 'Brass Pooja Thali Set',
        slug: 'brass-pooja-thali-set',
        category: 'Pooja Essentials',
        price: 1299,
        originalPrice: 1799,
        description:
            'Complete brass pooja thali set with intricately embossed traditional designs. Includes thali, diya, incense holder, kumkum-chawal container, and bell. Essential for daily worship and festive occasions.',
        features: [
            'Pure brass construction',
            'Traditional embossed patterns',
            'Set of 5 pieces',
            'Diameter: 10 inches',
            'Tarnish-resistant finish',
        ],
        tag: 'Popular',
        image: '/assets/product-2.png',
    },
    {
        id: 3,
        name: 'Rudraksha Mala (108 Beads)',
        slug: 'rudraksha-mala-108',
        category: 'Spiritual',
        price: 899,
        originalPrice: 1299,
        description:
            'Authentic 5-mukhi Rudraksha mala with 108 hand-knotted beads. Sourced from Nepal, each bead is naturally grown and energized. Ideal for japa meditation, daily chanting, and spiritual practice.',
        features: [
            'Genuine 5-mukhi Rudraksha',
            '108 + 1 Guru bead',
            'Hand-knotted with silk thread',
            'Bead size: 8-9mm',
            'Certificate of authenticity',
        ],
        tag: null,
        image: '/assets/product-3.png',
    },
    {
        id: 4,
        name: 'Sandalwood Incense Gift Box',
        slug: 'sandalwood-incense-gift-box',
        category: 'Pooja Essentials',
        price: 599,
        originalPrice: 899,
        description:
            'Premium sandalwood incense sticks in an elegant gift box. Hand-rolled using traditional methods with pure sandalwood powder and essential oils. Creates a divine ambiance for meditation and worship.',
        features: [
            'Pure sandalwood fragrance',
            '100 sticks per box',
            'Burn time: 45 minutes each',
            'Hand-rolled, chemical-free',
            'Elegant gift packaging',
        ],
        tag: 'New',
        image: '/assets/product-4.png',
    },
    {
        id: 5,
        name: 'Copper Panchpatra Set',
        slug: 'copper-panchpatra-set',
        category: 'Pooja Essentials',
        price: 799,
        originalPrice: 1199,
        description:
            'Traditional copper Panchpatra (achmani set) for daily pooja rituals. Crafted from pure copper with a mirror-polished finish. Includes patra (vessel) and spoon. Copper is revered in Vedic tradition for its purifying properties.',
        features: [
            'Pure copper construction',
            'Mirror-polished finish',
            'Includes vessel and spoon',
            'Height: 4 inches',
            'Ayurvedic health benefits',
        ],
        tag: null,
        image: '/assets/product-5.png',
    },
];

export function getProductBySlug(slug) {
    return products.find((p) => p.slug === slug);
}

export function formatPrice(price) {
    return `${STORE_CONFIG.currency}${price.toLocaleString('en-IN')}`;
}
