<script setup>
import { RouterView } from 'vue-router'
import './styles/index.css'

const theme = {
  token: {
    // Accent colours
    colorPrimary: '#1769E0',
    colorSuccess: '#16805B',
    colorError: '#C43D4B',
    colorWarning: '#B96B0B',
    colorInfo: '#1769E0',

    // Text
    colorText: '#172033',
    colorTextSecondary: '#687386',
    colorTextTertiary: '#687386',
    colorTextQuaternary: '#687386',

    // Backgrounds
    colorBgBase: '#F4F6F8',
    colorBgLayout: '#F4F6F8',
    colorBgContainer: '#FFFFFF',
    colorBgElevated: '#FFFFFF',
    colorFillSecondary: '#F8FAFC',
    colorFillTertiary: '#E2EBF6',

    // Borders
    colorBorder: '#DDE3EA',
    colorBorderSecondary: '#DDE3EA',

    // UI
    borderRadius: 8,
    controlHeight: 40,
    fontFamily: 'Inter, sans-serif',
  },

  components: {
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      borderRadius: 8,
      controlHeight: 40,
    },

    Input: {
      activeBorderColor: '#1769E0',
      hoverBorderColor: '#1769E0',
      borderRadius: 8,
    },

    Select: {
      optionSelectedBg: '#EAF2FF',
      optionActiveBg: '#E2EBF6',
      optionSelectedColor: '#1769E0',
      borderRadius: 8,
    },

    Switch: {
      colorPrimary: '#1769E0',
      colorPrimaryHover: '#1769E0',
    },

    Menu: {
      itemSelectedBg: '#EAF2FF',
      itemSelectedColor: '#1769E0',
      itemHoverBg: '#E2EBF6',
    },

    Table: {
      headerBg: '#F8FAFC',
      headerColor: '#172033',
      borderColor: '#DDE3EA',
      rowHoverBg: '#F4F6F8',
    },

    Card: {
      colorBgContainer: '#FFFFFF',
      borderRadiusLG: 12,
    },
  },
}
</script>

<template>
  <AConfigProvider :theme="theme">
    <RouterView />
  </AConfigProvider>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: var(--font);
}
</style>
