<template>
  <v-app class="bg-grey-lighten-5">
    <v-app-bar class="bg-light-green-darken-4">
      <v-container class="d-flex align-center">
        <v-icon icon="mdi-alarm" color="light-green-lighten-3" size="large" start></v-icon>
        <v-app-bar-title>蕃茄鐘</v-app-bar-title>
        <v-btn prepend-icon="mdi-home" to="/">首頁</v-btn>
        <v-btn prepend-icon="mdi-clipboard-list" to="/list">事項</v-btn>
        <v-btn prepend-icon="mdi-cog" to="/settings">設定</v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <!-- Component = 目前路由應該顯示的元件 -->
      <router-view v-slot="{ Component }">
        <!-- keep-alive 保持被包住的元件不被銷毀 -->
        <!-- 使用 include 指定只有 index 這個元件不被銷毀 -->
        <!--
            component 動態元件
            is = 要使用的元件
        -->
        <keep-alive include="index">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
//
</script>
