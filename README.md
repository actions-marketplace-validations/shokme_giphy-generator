# GIPHY Generator - GitHub Action. 
A GitHub Action (written in JavaScript) to generate a gif based on a query string, leveraging the [GIPHY API](https://developers.giphy.com/docs/api/endpoint/#search). Powered by GIPHY and GitHub Actions!

This is repo is based on the work of [@IAmHughes](https://github.com/IAmHughes/giphy-generator)

## Usage
### Pre-requisites
Create a workflow `.yml` file in your `.github/workflows` directory. An [example workflow](#example-workflow---giphy-generator) is available below.

### Inputs
For more information on these inputs, see the [GIPHY API Documentation](https://developers.giphy.com/docs/api/endpoint/#search).

- `query`: The [search term](https://developers.giphy.com/docs/api/endpoint#search) that search query term or phrase. Required
- `rating`: The [content rating](https://developers.giphy.com/docs/optional-settings#rating) used to filter results from the GIF search. Default: `g`
- `lang`: The [default language](https://developers.giphy.com/docs/optional-settings#language-support) that the search query is in. Default: `en` for English

### Example workflow - giphy generator
```yaml
name: Discord Notification

on:
  push:
    branches: [ staging ]

jobs:
  giphyGenerator:
    name: Giphy Generator
    runs-on: ubuntu-latest
    outputs:
      url: ${{ steps.giphy_generator.outputs.url }}
    steps:
      - name: Giphy Generator
        id: giphy_generator
        uses: shokme/giphy-generator@v1.1
        env:
          GIPHY_TOKEN: ${{ secrets.GIPHY_TOKEN }}
  discordNotification:
    name: Discord Notification
    runs-on: ubuntu-latest
    needs: giphyGenerator
    steps:
    - uses: actions/checkout@v2
    - name: Discord Notification
      uses: Ilshidur/action-discord@0.3.2
      with:
        args: ${{ needs.giphyGenerator.outputs.url }}
      env:
        DISCORD_WEBHOOK: ${{ secrets.DISCORD_WEBHOOK }}
        DISCORD_USERNAME: DeployInProgress
```

## Contributing
Pull requests are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License
The scripts and documentation in this project are released under the [GNU License](LICENSE)

## Disclaimer
This leverages the [GIPHY API](https://developers.giphy.com/docs/api/endpoint#search) to query results based on inputs you provide and the rating you use. As a consumer of this action, you accept responsibility of any gifs that are posted by this bot. The owner of this action does not control the search algorithm or endpoint that is returning images and is not responsible for it's content.
