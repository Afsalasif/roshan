// src/data/imageData.ts
// washroom images
import bathroom1 from '../../public/images/washroom/bathroom1.jpg';
import bathroom2 from '../../public/images/washroom/bathroom2.jpg';
import bathroom3 from '../../public/images/washroom/bathroom3.png';
import bathroom4 from '../../public/images/washroom/bathroom4.jpg';
//apartment images
import a1 from '../../public/images/apartment/a1.jpg';
import a2 from '../../public/images/apartment/a2.jpg';
import a3 from '../../public/images/apartment/a3.jpg';
import a4 from '../../public/images/apartment/a4.jpg';
import a5 from '../../public/images/apartment/a5.jpg';
import a6 from '../../public/images/apartment/a6.jpg';
import a7 from '../../public/images/apartment/a7.jpg';
import a8 from '../../public/images/apartment/a8.jpg';
import a9 from '../../public/images/apartment/a9.jpg';
import a10 from '../../public/images/apartment/a10.jpg';
import a11 from '../../public/images/apartment/a11.jpg';
//bar images
import A1 from '../../public/images/bar/A1.jpg';
import A2 from '../../public/images/bar/A2.jpg';
//bedroom images
import be1 from '../../public/images/bedroom/be1.jpg';
import be2 from '../../public/images/bedroom/be2.jpg';
import be3 from '../../public/images/bedroom/be3.jpg';
import be4 from '../../public/images/bedroom/be4.jpg';
import be5 from '../../public/images/bedroom/be5.jpg';
import be6 from '../../public/images/bedroom/be6.jpg';
import be7 from '../../public/images/bedroom/be7.jpg';
//dining images
import d1 from '../../public/images/dining/d1.jpg';
import d2 from '../../public/images/dining/d2.jpg';
import d3 from '../../public/images/dining/d3.jpg';
import d4 from '../../public/images/dining/d4.jpg';
//office images
import o1 from '../../public/images/offfice/o1.jpg';
import o2 from '../../public/images/offfice/o2.jpg';
import o3 from '../../public/images/offfice/o3.jpg';
import o4 from '../../public/images/offfice/o4.jpg';
import o5 from '../../public/images/offfice/o5.jpg';
import o6 from '../../public/images/offfice/o6.jpg';
import o7 from '../../public/images/offfice/o7.jpg';
import o8 from '../../public/images/offfice/o8.jpg';
//spa images
import s1 from '../../public/images/spa/s1.jpg';
import s2 from '../../public/images/spa/s2.jpg';
import s3 from '../../public/images/spa/s3.jpg';
import s4 from '../../public/images/spa/s4.jpg';
import s5 from '../../public/images/spa/s5.jpg';
import s6 from '../../public/images/spa/s6.jpg';
import s7 from '../../public/images/spa/s7.jpg';
import s8 from '../../public/images/spa/s8.jpg';
import s9 from '../../public/images/spa/s9.jpg';
import s10 from '../../public/images/spa/s10.jpg';
import s11 from '../../public/images/spa/s11.jpg';
import s12 from '../../public/images/spa/s12.jpg';
import s13 from '../../public/images/spa/s13.jpg';
import s14 from '../../public/images/spa/s14.jpg';
import s15 from '../../public/images/spa/s15.jpg';
import s16 from '../../public/images/spa/s16.jpg';
import s17 from '../../public/images/spa/s17.jpg';
import s18 from '../../public/images/spa/s18.jpg';
import s19 from '../../public/images/spa/s19.jpg';
import s20 from '../../public/images/spa/s20.jpg';
import s21 from '../../public/images/spa/s21.jpg';
//villa images
import v1 from '../../public/images/villa/v1.jpg';
import v2 from '../../public/images/villa/v2.jpg';
import v3 from '../../public/images/villa/v3.jpg';
import v4 from '../../public/images/villa/v4.jpg';
import v5 from '../../public/images/villa/v5.jpg';
import v6 from '../../public/images/villa/v6.jpg';
import v7 from '../../public/images/villa/v7.jpg';
import v8 from '../../public/images/villa/v8.jpg';
import v9 from '../../public/images/villa/v9.jpg';
import v10 from '../../public/images/villa/v10.jpg';
import v11 from '../../public/images/villa/v11.jpg';


interface ImageDataItem {
    id: number;
    src: string;
    alt: string;
}

interface ImageData {
    washroom: ImageDataItem[];
    apartment: ImageDataItem[];
    bar: ImageDataItem[];
    bedroom: ImageDataItem[];
    dining: ImageDataItem[];
    office: ImageDataItem[];
    spa: ImageDataItem[];
    villa: ImageDataItem[];
}

const imageData: ImageData = {
    washroom: [
        { id: 1, src: bathroom1.src, alt: 'Modern Washroom Design' },
        { id: 2, src: bathroom2.src, alt: 'Elegant Washroom' },
        { id: 3, src: bathroom3.src, alt: 'Modern Washroom Design' },
        { id: 4, src: bathroom4.src, alt: 'Elegant Washroom' },
    ],
    apartment: [
        { id: 5, src: a1.src, alt: 'Cozy Apartment' },
        { id: 6, src: a2.src, alt: 'Luxury Apartment' },
        { id: 7, src: a3.src, alt: 'Cozy Apartment' },
        { id: 8, src: a4.src, alt: 'Luxury Apartment' },
        { id: 9, src: a5.src, alt: 'Cozy Apartment' },
        { id: 10, src: a6.src, alt: 'Luxury Apartment' },
        { id: 11, src: a7.src, alt: 'Cozy Apartment' },
        { id: 12, src: a8.src, alt: 'Luxury Apartment' },
        { id: 13, src: a9.src, alt: 'Cozy Apartment' },
        { id: 14, src: a10.src, alt: 'Luxury Apartment' },
        { id: 15, src: a11.src, alt: 'Luxury Apartment' },
    ],
    bar: [
        { id: 16, src: A1.src, alt: 'Modern Bar Design' },
        { id: 17, src: A2.src, alt: 'Classic Bar Design' },
    ],
    bedroom: [
        { id: 18, src: be1.src, alt: 'Cozy Bedroom' },
        { id: 19, src: be2.src, alt: 'Luxury Bedroom' },
        { id: 20, src: be3.src, alt: 'Cozy Bedroom' },
        { id: 21, src: be4.src, alt: 'Luxury Bedroom' },
        { id: 22, src: be5.src, alt: 'Cozy Bedroom' },
        { id: 23, src: be6.src, alt: 'Luxury Bedroom' },
        { id: 24, src: be7.src, alt: 'Luxury Bedroom' },
    ],
    dining: [
        { id: 25, src: d1.src, alt: 'Elegant Dining Room' },
        { id: 26, src: d2.src, alt: 'Modern Dining Room' },
        { id: 27, src: d3.src, alt: 'Elegant Dining Room' },
        { id: 28, src: d4.src, alt: 'Modern Dining Room' },
    ],
    office: [
        { id: 29, src: o1.src, alt: 'Modern Office' },
        { id: 30, src: o2.src, alt: 'Classic Office' },
        { id: 31, src: o3.src, alt: 'Modern Office' },
        { id: 32, src: o4.src, alt: 'Classic Office' },
        { id: 33, src: o5.src, alt: 'Modern Office' },
        { id: 34, src: o6.src, alt: 'Classic Office' },
        { id: 35, src: o7.src, alt: 'Classic Office' },
        { id: 36, src: o8.src, alt: 'Modern Office' },
    ],
    spa: [
        { id: 37, src: s1.src, alt: 'Relaxing Spa' },
        { id: 38, src: s2.src, alt: 'Luxury Spa' },
        { id: 39, src: s3.src, alt: 'Relaxing Spa' },
        { id: 40, src: s4.src, alt: 'Luxury Spa' },
        { id: 41, src: s5.src, alt: 'Relaxing Spa' },
        { id: 42, src: s6.src, alt: 'Luxury Spa' },
        { id: 43, src: s7.src, alt: 'Relaxing Spa' },
        { id: 44, src: s8.src, alt: 'Luxury Spa' },
        { id: 45, src: s9.src, alt: 'Relaxing Spa' },
        { id: 46, src: s10.src, alt: 'Luxury Spa' },
        { id: 47, src: s11.src, alt: 'Relaxing Spa' },
        { id: 48, src: s12.src, alt: 'Luxury Spa' },
        { id: 49, src: s13.src, alt: 'Relaxing Spa' },
        { id: 50, src: s14.src, alt: 'Luxury Spa' },
        { id: 51, src: s15.src, alt: 'Relaxing Spa' },
        { id: 52, src: s16.src, alt: 'Luxury Spa' },
        { id: 53, src: s17.src, alt: 'Relaxing Spa' },
        { id: 54, src: s18.src, alt: 'Luxury Spa' },
        { id: 55, src: s19.src, alt: 'Relaxing Spa' },
        { id: 56, src: s20.src, alt: 'Luxury Spa' },
        { id: 57, src: s21.src, alt: 'Relaxing Spa' },
    ],
    villa: [
        { id: 58, src: v1.src, alt: 'Luxury Villa' },
        { id: 59, src: v2.src, alt: 'Modern Villa' },
        { id: 60, src: v3.src, alt: 'Luxury Villa' },
        { id: 61, src: v4.src, alt: 'Modern Villa' },
        { id: 62, src: v5.src, alt: 'Luxury Villa' },
        { id: 63, src: v6.src, alt: 'Modern Villa' },
        { id: 64, src: v7.src, alt: 'Luxury Villa' },
        { id: 65, src: v8.src, alt: 'Modern Villa' },
        { id: 66, src: v9.src, alt: 'Luxury Villa' },
        { id: 67, src: v10.src, alt: 'Modern Villa' },
        { id: 68, src: v11.src, alt: 'Modern Villa' },
    ],
};

export type { ImageDataItem };
export default imageData;