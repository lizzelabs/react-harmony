# 📦 React Harmony

A new way of build user interfaces with react.

- Everything is JS its easy to maintain.
- You're totally able to create your CSS systems and share between sort of
  pieces with just JS.
- Lightweight library: 13.5K

---

## 🧭 Índice

- [📖 Why](#-why)
- [⚙️ Quick Start](#️-quick-start)
- [🔧 Piece](#-piece)
- [🛠️ Piece Provider](#-piece-provider)
- [♾️ Default CSS System](#-estrutura-do-projeto)
- [🖥️ Screen](#-screen)
- [✏️ Text](#-text)
- [↕️↔️ Scrollable](#-scrollable)
- [📏 Media](#-media)
- [🎨 Animations](#-animations)
- [🚀 withPieceAsContainer](#-withpieceascontainer)
- [🖼️ Example Projects](#-example-projects)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📖 Why

Nowadays we have a lot of libs of style, and many times we dont need to
everything in each one to build our interfaces after all it costs to our users
download every css class unused, so i think in an easy and elegant way to style
all of components and how to keep everything easy to mantain.

---

## ⚙️ Quick Start

NPM:

```sh
npm i --save @lizzelabs/react-harmony
```

YARN:

```sh
yarn add @lizzelabs/react-harmony

```

PNPM:

```sh
pnpm add @lizzelabs/react-harmony

```

Bun:

```sh
bun add @lizzelabs/react-harmony
```

after it, its just importing from:

```javascript
import { Piece } from '@lizzelabs/react-harmony';
```

`@lizzelabs/react-harmony/components/piece` => splitted by component ex: /screen
/animations /media /text.

`@lizzelabs/react-harmony/components` => all components

`@lizzelabs/react-harmony/hocs` => HOCS

`@lizzelabs/react-harmony/systems` => CSS systems

## 🔧 Piece

First of all eveything you want to put in your screen is a piece and i would
like that you start to think on it:

I want to put a link on my page:

```javascript
import { Piece } from '@lizzelabs/react-harmony';

<Piece
  as='a'
  href='https://mywebsite.com'
></Piece>;
```

Or some input:

```javascript
import { Piece } from '@lizzelabs/react-harmony';

<Piece
  as='input'
  type='text'
  onChange={handleText}
></Piece>;
```

Even a simple div:

```javascript
import { Piece } from '@lizzelabs/react-harmony';

<Piece
  as='div'
  onBlur={handleBlur}
></Piece>;
```

I offer a attractive way to style each one with **withStyle**:

```javascript

import { Piece } from '@lizzelabs/react-harmony';


<Piece withStyle={{
  containerType: 'inline-size',
  containerName: 'card'
  flex: '0 0 100%'
}} > <Piece withStyle={{
    background: 'blue',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      background: 'red'
    },
    '@media screen (max-width: 500px)': {
      background: 'yellow'
    },
    '@container card (max-width: 600px)': {
      flexDirection: 'column'
    }
    '@keyframes fade': {
      from: {
        opacity: 0;
      }
      to: {
        opacity: 1;
      }
    }
  }} >
    <Piece as='span'>Hello world!</Piece>
  </Piece>
</Piece>

```

I can't forget about aria:

```javascript
import { Piece } from '@lizzelabs/react-harmony';

<Piece
  aria={{
    'aria-autocomplete': 'none',
    'aria-description': 'This is a test',
  }}
/>;
```

or some properties inline like:

```javascript
import { Piece } from '@lizzelabs/react-harmony';

<Piece
    <!-- margin='10px' -->
    <!-- margin={theme => theme.margin} -->
    <!-- padding='12px' -->
    <!-- padding={theme => theme.padding} -->
    <!-- textColor='#FFF' -->
    <!-- textColor={theme => theme.text} -->
    <!-- background='#333' -->
    <!-- background={theme => theme.background} -->
    <!-- backgroundColor='#333' -->
    <!-- backgroundColor={theme => theme.background} -->
    <!-- fontSize='20px' -->
    <!-- fontSize={theme => theme.main.textSize} -->
    gap='5px'
    direction='column'
    alignContent='center'
    justifyContent='center'
    alignItems='center'
    justifyItems='center'
    height='30px'
    width='30px'
    display='block'
    <!-- contentColumns='1fr 1fr' -->
    <!-- contentColumns={2} -->
    <!-- contentRows='1fr 1fr 1fr' -->
    <!-- contentRows={3} -->
    <!-- atColumn='1 / 2' -->
    <!-- atColumn={2} -->
    <!-- atRow='1 / 2' -->
    <!-- atRow={4} -->
    flex='1 0 auto'
/>

```

**Important:** you can pass the theme to withStyle like:

`withStyle={(theme: Theme) => ({ ///CSS Properties Here })}`

or and array of styles like:

```javascript
import { AlignCenter, FlexDirectionColumn } from './mylib/styles';

<Piece withStyle={[AlignCenter, FlexDirectionColumn]}></Piece>;
```

last but not less important

```javascript
import { Piece } from '@lizzelabs/react-harmony';

<Piece
  as='section'
  kind='page'
></Piece>;
```

you can define and set default properties or styles in the provider that we will
see below.

---

## 🛠️ Piece Provider

Basic syntax

```typescript

import { PieceProvider, Piece } from '@lizzelabs/react-harmony';

type MyCustomPersonalTheme = {
  primary: string;
  secondary: string;
  text: string;
}

<PieceProvider
    theme={{
      primary: 'blue',
      secondary: 'yellow',
      text: 'rgb(235, 235, 235)'
    } satisfies MyCustomPersonalTheme}
    patterns={[
      {
        applyOn: 'all',
        styles: (theme: MyCustomPersonalTheme) => ({
          background: theme.primary,
          fontSize: '16px',
          overflow: 'hidden'
        })
      },
      {
        applyOn: (props: PieceProperties<MyCustomPersonalTheme, any, any>) => props.kind === 'link',
        defaults: (theme: MyCustomPersonalTheme) => ({
          aria: {
            'aria-description': 'Click to go to the link'
          }
        }),
        styles: {
          textDecoration: 'none'
        }
      },
      {
        applyOn: 'section',
        styles: {
          height: '100%',
          width: '100%'
        }
      }
    ]} >
  <Piece as='p' background={(theme: MyCustomPersonalTheme) => theme.primary} textColor={(theme: MyCustomPersonalTheme) => theme.text} >
    Hello World
  </Piece>
</PieceProvider>

```

Basically we have:

**Theme:** Custom object could be anything and could be typed with typescript if
you rather and use.

**Patterns** An array of objects that receive:

- **applyOn:**
  - `all`: All of components utils if you want a css reset.
  - `(properties: PieceProperties<Theme, any>) => boolean`: a function that
    receive a PieceProperty and returns a boolean.
  - `span` | `div` | `a`: HtmlTag
- **defaults:**: Object of default properties of categorized piece.
- **styles**: Object with styles that you can put your own style in each kind
  piece.

**(In styles or default props, you can receive a theme object turning it into a
function)**

---

## ♾️ Default CSS System

```javascript
import { HARMONY_SYSTEM, PieceProvider } from '@lizzelabs/react-harmony';

<PieceProvider patterns={HARMONY_SYSTEM}>//Your Components ...</PieceProvider>;
```

harmony system is simple and designed to be css Flex or Grid friend and **anti
overflow** or thats say where you want to put an overflow you have a special
component called <Scrollable></Scrollable> where you are able to set if it is
vertical or horizontal. Basically what you have be in mind is Flex = every
component, every small detail, Grid = Complex areas to organize/big areas to
organize. and you can extend the system:

```javascript
import { HARMONY_SYSTEM, mergeSystems, PieceProvider } from '@lizzelabs/react-harmony';

const MyOwnSystem = mergeSystems(HARMONY_SYSTEM, { applyOn: // the rest.... });

<PieceProvider patterns={MyOwnSystem}>
  //Other Components
</PieceProvider>

```

Or even create your own system for each piece etc...

```javascript
import { PieceProvider } from '@lizzelabs/react-harmony';

const MyOwnSystem = [
  {
    applyOn: 'all',
    styles: {} // MyResetCssObject
  },
  {
    applyOn: props => props.kind === 'all-left-div',
    styles: {
      display: 'block',
      float: 'left' // I'm kidding 🤣 (Nothing against the old school).
    }
  }
]

<PieceProvider patterns={MyOwnSystem}>
  //Other Components
</PieceProvider>

```

---

## 🖥️ Screen

A component that offers to you a way to stylize your html, body, set some global
style, with just one piece too and thats called by Screen

```javascript
import { Screen } from '@lizzelabs/react-harmony';

<Screen
  containerId='root'
  fontSize='16px'
  fontFamily='"Mozilla Text", sans-serif' //Important to have the font on html file
  globalStyle={{
    div: {
      borderRadius: '50%',
    },
  }}
>
  //My Components here
</Screen>;
```

**`containerId:`** Important the react root id where it will be rendered
normally where you do createRoot(document.getElementById('root' // this ID))

**`fontSize:`** Set a fontsize for all document, important to have a base size.

**`fontFamily:`** Important to have the font on html file

**`globalStyle:`** Global styles.

---

## ✏️ Text

Just for texts its another kind of piece that i limit it as

```javascript
import { Text } from '@lizzelabs/react-harmony';

<Text as='p'></Text>;
```

**Important** the default kind here is text and about the as you just can put
text tags ....

---

## ↕️↔️ Scrollable

Everytime i see in websites scrolls that broke your navigation, and more in
general it is ugly so i offer to you a component that you can personalize your
scroll with the colors from your theme like:

```javascript
import { PieceProvider, mergeSystems, HARMONY_SYSTEM, Scrollable } from '@lizzelabs/react-harmony';


<PieceProvider patterns={mergeSystems(HARMONY_SYSTEM, {
  applyOn: (props) => props.kind === 'scrollable',
  theme={{ color: 'blue', highlight: 'orangeblue' }}
  style: (theme: Theme) => ({
    '--color': theme.color,
    '--highlight': theme.highlight,
  }),
})} >
      <Scrollable
        horizontal
        scrollSnap='x mandatory' // Optional
        behavior='instant' //Optional
      >
        //My Horizontal items
      </Scrollable>
</PieceProvider>

```

** Important: I will put an example bellow **

---

## 📏 Media

Sometimes you want to hide something on a screen and I have a ready and fast way
to do it like:

```javascript
import { Media } from '@lizzelabs/react-harmony'


<Media query='(max-width: 500px)' removeFromHtml={true or false} >
  //Your component that you want to hide on screens bigger than   500px of width
</Media>

```

---

## 🎨 Animations

Sometimes you wanna share some animations between N kind component so you can do
it with Animations

```javascript
import { Animations } from '@lizzelabs/react-harmony';


<Animations value={{
  name: 'fade',
  animation: {
      '@keyframes fade': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
      },
  },
}
}} >
//you compoennt
</Animations>

```

And now you can use animate: fade 0.3s infinite anywhere of course inside your
Animations component.

---

## 🚀 withPieceAsContainer

Sometimes you want to write your own component but when you have to use, you
want align, move and etc, so i have a simple hoc that involve your component
into Piece container, you can align outside ask for props or something else
like:

```typescript
import { withPieceAsContainer, Piece } from '@lizzelabs/react-harmony';


const InternalButton = withPieceAsContainer((props: ButtonProps) => {
  return (
      <Piece
        as='button'
        kind='button'
        withStyle={(theme: Theme) => (
          {
            alignItems: 'center',
            justifyContent: 'center',
            flex: `1 0 auto`,
            padding: theme.buttonPadding,
            background: theme.color,
            color: theme.text,
            fontSize: `${size}px`,
            borderRadius: radius,
            aspectRatio: '1 / 1',
            outline: 'none',
            boxSizing: 'border-box',
            '&:hover': {
              background: theme.highlight,
            },
        },
      )}
        onClick={props.onClick}
      >
        {props.children}
      </Piece>
  )
}, { withStyle: { flex: '1 1 auto' }  });


export const IconButton = InternalButton as typeof InternalButton;

```

Now you are able to align, justify, etc outside of button, its very nice do it.
and i have to you remember if you will use this, you have always to think like
you component fills every space and the outside just align you know.

---

## 🖼️ Example Projects

Here are some examples that you are free to get some inspiration:

---

## 🤝 Contributing

I will be so happy that you like to contribute, in this guide you will find
instructions, how to setup the repo locally.

1. Install **PNPM**
2. Before all run: `pnpm install`
3. Do your changes inside a branch with this convention:

- `fix/you-fix-name` -> if your change is a fix for something broken.
- `feature/your-feature-name` -> if your change will add something.

4. Commit convention:

- I use the
  [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
  for my commit messages. **Example** `feat: [#555] this is my commit message.`

5. Push the branch to the repository, fill the PR that will be opened with
   informations about what you add, etc.

---

## 📄 License

MIT License © 2026 - [Gustavo Lizze](https://github.com/gustavolizze)

---
