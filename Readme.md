# Shortr

![](https://shortr.dsen.tech/img/logo.afafeb6b.svg)


##Project Details

####Project Setup

`$ npm install `

`$ npm start `

###API Endpoints
                    
| Endpoint | Description                    | Returns
| ------------- | ------------------------------ |
| get : `/:id`      | Retrieve the url to redirect to.       | `{redirectUrl:(url)}`
| post : `/shorten`    |  Generate a shortlink     | `{shortId : (generated short id)}`

###Roadmap

- [x] Retrieve Link
- [x] Add link
- [ ] Analytics
    - [ ] Click count
    - [ ] Browser Insights
    - [ ] Traffic 
- [ ] Firebase Auth
    - [ ] Save all analytics data
    - [ ] Store all generated shortlinks