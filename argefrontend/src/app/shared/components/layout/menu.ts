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
    {
        title: 'Personel Yönetimi',
        link: '/persons/',
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


