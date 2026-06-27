# shynj2 Gym App — React Native

اپلیکیشن باشگاه هوشمند — تبدیل شده از HTML به React Native (Expo)

## ساختار پروژه

```
shynj2-gym-app/
├── App.js                        # Entry point اصلی
├── app.json                      # تنظیمات Expo
├── eas.json                      # تنظیمات Build برای APK/AAB
├── package.json
├── babel.config.js
└── src/
    ├── context/
    │   └── AppContext.js          # State مرکزی (userData, water, equipment)
    ├── data/
    │   └── index.js               # همه داده‌ها: تجهیزات، برنامه هفتگی، وعده‌ها
    ├── theme/
    │   └── colors.js              # رنگ‌های اپ
    ├── components/
    │   └── BottomNav.js           # نوار ناوبری پایین
    └── screens/
        ├── OnboardingScreen.js    # صفحه ثبت اطلاعات اولیه
        ├── HomeScreen.js          # صفحه خانه
        ├── EquipmentScreen.js     # تجهیزات با جستجو و پنل
        ├── ProgramScreen.js       # برنامه هفتگی با ست‌های قابل ویرایش
        ├── DietScreen.js          # رژیم، آب روزانه، وعده‌ها
        └── ProfileScreen.js       # پروفایل، BMI، تنظیمات
```

## نصب و راه‌اندازی

### پیش‌نیازها
- Node.js 18+
- npm یا yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### مراحل

```bash
# ۱. نصب وابستگی‌ها
npm install

# ۲. اجرا روی شبیه‌ساز یا دستگاه
npm start
# سپس اسکن QR کد با Expo Go app
```

## ساخت APK (فایل اندروید)

### روش ۱ — EAS Build (توصیه شده، بدون نیاز به Mac/Linux)

```bash
# نصب EAS CLI
npm install -g eas-cli

# لاگین به اکانت Expo (رایگان)
eas login

# ساخت APK برای تست
eas build --platform android --profile preview

# پس از اتمام (~10 دقیقه)، لینک دانلود APK داده می‌شه
```

### روش ۲ — Local Build (نیاز به Android Studio)

```bash
# نصب android build tools
npm install -g expo-cli

# ساخت local
npx expo run:android
```

## امکانات اپ

| صفحه | امکانات |
|------|---------|
| **Onboarding** | نام، سن، جنسیت، وزن، قد، هدف |
| **خانه** | آمار هفته، برنامه امروز با تیک زدن تمرین‌ها |
| **تجهیزات** | ۳۰ دستگاه، جستجو، فیلتر دسته‌بندی، پنل جزئیات |
| **برنامه** | ۷ روز هفته، تب‌ها، کارت‌های قابل باز شدن، ویرایش وزن/تکرار |
| **رژیم** | ماکرو روزانه، ردیابی آب (۸ لیوان)، ۵ وعده غذایی |
| **پروفایل** | BMI، آمار، ویرایش پروفایل، تنظیمات |

## تکنولوژی‌ها

- **React Native** + **Expo** SDK 51
- **React Context API** برای state management
- بدون هیچ library اضافه‌ای — فقط core React Native
- پشتیبانی کامل از RTL (راست به چپ) فارسی
