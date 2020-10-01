# Shortr

![](https://shortr.dsen.tech/img/logo.afafeb6b.svg)

# ##Project Details

## Project Details

#### Project Setup

`$ npm install `

`$ npm start `

### API Endpoints

| Endpoints            | Description                                  | Returns                            |
| -------------------- | -------------------------------------------- | ---------------------------------- |
| get : `/:id`         | Retrieve the url to redirect to.             | `{redirectUrl:(url)}`              |
| post : `/url/add`    | Generate a shortlink                         | `{shortId : (generated short id)}` |
| post : `/url/update` | Update original link of a provided shortlink | `{shortId : (generated short id)}` |

### Roadmap

- [x] Retrieve Link
- [x] Add link
- [ ] Analytics
  - [x] Click count
  - [ ] Browser Insights
  - [ ] Traffic
- [ ] Firebase Auth
  - [ ] Connect Anonymous account while user signup
  - [x] Store all generated shortlinks
