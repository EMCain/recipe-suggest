<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
  <footer>
    <p>
      Note: to the relief of recipe writers everywhere, comments aren't actually
      being posted on any websites. I take no responsibility for any crimes
      against gastronomy that result from the use of this software.
    </p>
    <p>
      <a href="https://github.com/EMCain/recipe-suggest" target="_blank">
        Source code
      </a>
      |
      <a href="https://emcain.github.io" target="_blank">My portfolio site</a>
    </p>
  </footer>
</template>

<style lang="scss">
// https://colorhunt.co/palette/d1e8e4c37b89bccc9aeae7c6
$beige: #eae7c6;
$light-green: #bccc9a;
$dark-green: darken($light-green, 40%);
$rose: #c37b89;
$dark-rose: darken($rose, 40%);
$light-blue: #d1e8e4;
$dark-blue: darken($light-blue, 50%);

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark-green;
  background-color: $beige;
  padding-bottom: 40px;
}
a {
  color: $dark-blue;
}

nav {
  padding: 30px;
  background-color: $light-blue;
  border: solid $dark-blue;

  a {
    font-weight: 500;
    color: $dark-blue;

    &.router-link-exact-active {
      color: $dark-rose;
      font-weight: 900;
      text-decoration: none;
    }
  }
}

footer {
  padding-top: 2em;
  font-style: italic;
  font-size: 0.8em;
  p:last-child {
    font-style: normal;
  }
}
</style>
