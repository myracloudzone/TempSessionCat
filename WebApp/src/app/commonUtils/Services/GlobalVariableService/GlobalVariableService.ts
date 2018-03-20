export class GlobalVariableService {
    public static API_ENDPOINT = '';
    public static NOTIFICATION_OPTIONS = { position : ['top', 'right'],
                                           showProgressBar: true,
                                           pauseOnHover: false,
                                           timeOut : 1000,
                                           clickToClose: true,
                                           animate : 'rotate'
                                         };
    public static appName = 'Home';
    public static appGenericName = 'Home';
    public static appLanguage = 'en';
    public static certainLogoPath = '../../../../assets/images/CertainLogo.png';
    public static userLogoPath = '../../../../assets/images/user.png';
    public static dropBoxOptions = {
        linkType: 'preview', // or "direct"
        multiselect: false, // or true
        extensions: ['.jpeg', '.JPEG', '.jpg', '.JPG', '.png', '.PNG']
    };
    public static driveOptions = {
        'devkey': 'AIzaSyA84jDWNpgqcU6E4Gb2sN698AtjMBDoKDA',
        'appid': '481482657853-cmqbg08b015rvshfb26tm5g6gv9ofvej.apps.googleusercontent.com',
        'width': 800,
        'height': 600
    };


    public static setAppNameValues(appName: string, appGenericName: string) {
        GlobalVariableService.appName = appName;
        GlobalVariableService.appGenericName = appGenericName;
    }
}