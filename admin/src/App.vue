<template>
  <div id="app">
    <router-view :key="new Date().getTime()"/>
  </div>
</template>

<style>
html,body{
  margin:0;
  padding:0;
}
</style>
