# network-coverage

This project serves to get information about networks coverage for such address. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Prerequisites

To start work on this project you will need to install both node and git.

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew update
$ brew doctor
$ brew install node
$ brew install git
```

### Installing

To start development you'll need to do the following.

Download the repository 

```
mkdir code-coverage
git clone https://github.com/allalla73/network-coverage.git
```

Install all the related dependencies for the project

```
cd code-coverage
npm install
```

You can then validate your installation by starting the server and browsing to http://localhost:5000/?q=address_to_search_placeholder
```
npm run dev
```