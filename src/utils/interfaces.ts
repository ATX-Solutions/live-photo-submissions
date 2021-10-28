export interface ImageResponse {
    id: number;
    width: number;
    height: number;
    url: string;
    photographer: string;
    photographer_url: string;
    photographer_id: number;
    avg_color: string;
    src: ImageResponseSrc;
    liked: boolean;
    groupKey?: number;
}

interface ImageResponseSrc {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
    custom?: string;
}

// const x = {
//     id: 3408744,
//     width: 3546,
//     height: 2255,
//     url: 'https://www.pexels.com/photo/scenic-view-of-snow-capped-mountains-during-night-3408744/',
//     photographer: 'stein egil liland',
//     photographer_url: 'https://www.pexels.com/@therato',
//     photographer_id: 144244,
//     avg_color: '#557088',
//     src: {
//         original: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg',
//         large2x: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
//         large: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
//         medium: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=350',
//         small: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&h=130',
//         portrait: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800',
//         landscape: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200',
//         tiny: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280',
//     },
//     liked: false,
// };
