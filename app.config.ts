import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: 'TodoList App',
    slug: 'todolist-app',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      bundleIdentifier: 'dev.josepinfante.todolist',
      buildNumber: '1.0.0',
      supportsTablet: true
    },
    android: {
      package: 'dev.josepinfante.todolist',
      versionCode: 1,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
        API_URL: process.env.API_URL ?? 'http://localhost:3000',
    },
  };
}