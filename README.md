# Repository Bio
This repository is used to document and keep a detailed user guide of ways on how to use SimpleLogin, more effectively and easily.

# Contributing
Anybody is welcome to contribute grammatical and factual corrections. 

# Guides Copyright 
All contect in this repository is copyright ® of SimpleLogin SAS.

**Copyright ® SimpleLogin SAS**

# Third Party Licenses
Docs made possible by [MkDocs](https://www.mkdocs.org), which the use of the softawre is licensed under a "[BSD 2-Clause License](https://github.com/mkdocs/mkdocs/blob/master/LICENSE)".

# Docs Installation

## Via UV

We recommend using [uv](https://github.com/astral-sh/uv) for installing dependencies. After having `uv` installed, simply run

```bash
uv sync
uv run mkdocs serve
```

Then open http://localhost:8000/docs/ to see a copy of the docs.

## Via pip

If you have python installed, you can also install `mkdocs-material` via `pip`. Please check how to install `pip` on your operating system, for example on Debian system, you can run `sudo apt install python3-pip`.

After that, you can install `mkdocs-material` with:

```bash
pip install mkdocs-material
```

Now let's run the server:

```bash
mkdocs serve
```

Then open http://localhost:8000/docs/

# How to add a new page

The doc is written in markdown format. To add a new page, you need to run the code locally, you can refer to **Docs Installation** section on how to run the code.

Please take a look at existing pages to make sure new page follow the same structure and images files (if any) are stored in the right folder.

1) Create a new page in the corresponding folder (`getting-started/`, `subdomain/`, etc.). 

2) Add the new page in `mkdocs.yml` file so it will appear on the left sidebar

3) Run the server locally if it isn't already done. The new page should appear on the left sidebar. Any change will be refreshed automatically.

4) Create a pull request for the new page, ideally with some screenshots of the changes.

