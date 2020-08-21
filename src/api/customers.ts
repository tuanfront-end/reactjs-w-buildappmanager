export interface DataCustomers {
  status: 'success';
  customers: Customer[];
  paged: number;
  msg?: string;
}

export interface DataCustomersError {
  status: 'error';
  msg: string;
}

export interface Customer {
  userInfo: {
    userID: number;
    userName: string;
    displayName: string;
    userEmail: string;
    avatar: string;
  };
  appInfo: {
    orderId: string;
    ios_username: string;
    ios_password: string;
    android_username: string;
    android_password: string;
    wp_website: string;
    wp_username: string;
    wp_password: string;
    app_vectorlogo: string;
    app_logo: string;
    app_notification: string;
    app_splash: string;
    app_logincover: string;
    app_screenlogo: string;
    app_fb_app_id: string;
    app_google_api_key: string;
    contact_yourskype: string;
    contact_email: string;
    contact_utftimezone: string;
    name: string;
    description: string;
    slug: string;
    configure_app_skip_btn: string;
    configure_app_title: string;
    configure_app_text: string;
    version: string;
    maincolor: string;
    android: string;
    android_versioncode: string;
    android_package: string;
    ios: string;
    ios_buildnumber: string;
    ios_bundleIdentifier: string;
    last_build_of_app: string;
    appointment: string;
  };
  itemsPurchased: [
    {
      orderID: string;
      orderDate: string;
      items: [
        {
          orderItemID: number;
          orderItemName: string;
          productID: number;
        },
      ];
    },
  ];
}
