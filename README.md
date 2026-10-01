# Frontend Mentor - Body Mass Index Calculator solution

This is a solution to the [Body Mass Index Calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/body-mass-index-calculator-brrBkfSz1T). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select whether they want to use metric or imperial units
- Enter their height and weight
- See their BMI result, with their weight classification and healthy weight range
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Github](https://github.com/artemkotko14/body-mass-index-calculator)
- Live Site URL: [Website](https://artemkotko14.github.io/body-mass-index-calculator/)

## My process

### Built with

- Semantic HTML5 markup
- SCSS
- Flexbox
- CSS Grid
- Mobile-first workflow
- Responsive design
- Vanilla JavaScript
- CSS clamp() for fluid responsive sizing

### What I learned

`aria-atomic="true"` tells the screen reader:
When something inside this live region changes, announce the whole region, not just the changed part.

```html
<div
  class="bmi-result"
  id="bmi-result"
  aria-live="polite"
  aria-atomic="true"
></div>
```

`clamp()` lets a value grow smoothly between a minimum and maximum as the screen gets wider.

```css
gap: clamp(2rem, calc(2rem + (100vw - 950px) * 0.202), rem(131));
```

```
// Formula
clamp(
  MIN,
  calc(MIN + (100vw - START_WIDTH) * MULTIPLIER),
  MAX
);

// Calculate the multiplier
MULTIPLIER = (MAX - MIN) / (END_WIDTH - START_WIDTH);
```

Example — grow from 32px at 950px to 131px at 1440px:

```
MULTIPLIER = (131 - 32) / (1440 - 950)
           = 99 / 490
           = 0.202
gap: clamp(
  32px,
  calc(32px + (100vw - 950px) * 0.202),
  131px
);
```

This line applies a soft blue drop shadow offset to the bottom-right of an element using CSS:

```css
box-shadow: 16px 32px 56px 0px rgba(139, 174, 207, 0.25);
```

This line creates a smooth horizontal gradient that transitions from pure white on the left to a light blue on the right:

```css
background: linear-gradient(90deg, #ffffff 0%, #d6e6fe 100%);
```

To combine two inputs to one listener:

```js
[heightInput, weightInput].forEach((input) => {
  input.addEventListener("input", () => {});
});
```

Use `h ** 2` to square a number in JS.

## Author

- Github - [Artem Kotko](https://github.com/artemkotko14)
- Frontend Mentor - [@artemkotko14](https://www.frontendmentor.io/profile/artemkotko14)
