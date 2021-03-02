import { NbMenuItem } from '@nebular/theme';



export const aMenu: NbMenuItem[] = [
    {
        title: 'Yönetim',
        icon: 'settings-2-outline',
        home: true,
        link: '/dashboard',
    },
    {
        title: 'Kullanıcı Yönetimi',
        link: '/admin/user/',
        icon: 'eye-outline'
    },
    /*    {
           title: 'Personel Yönetimi',
           link: '/persons/',
           icon: 'eye-outline'
       }, */
    {
        title: 'Özgeçmiş Yönetimi',
        link: '/ozgecmis/',
        icon: 'eye-outline'
    },
    {
        title: 'Başvuru Yönetimi',
        link: '/basvuru/',
        icon: 'eye-outline'
    },
    {
        title: 'Başvuru İnceleme',
        link: '/inceleme/',
        icon: 'eye-outline'
    },
    {
        title: 'Kontrol List',
        link: '/admin/kontrol-list',
        icon: 'eye-outline'
    },
    {
        title: 'Kontrol Atama',
        link: '/admin/kontrol-atama',
        icon: 'eye-outline'
    }




];


export const mMenu: NbMenuItem[] = [

    {
        title: 'manager gör',
        link: '/admin/user/',
        icon: 'eye-outline'
    }

];

export const uMenu: NbMenuItem[] = [


    {
        title: 'Başvuru Yönetimi',
        link: '/user/basvuru-list/',
        icon: 'eye-outline'
    },
    {
        title: 'Başvuru Ekleme',
        link: '/basvuru/add/',
        icon: 'eye-outline'
    },

];


