==================
README of Psychopo
==================


Presentation
============

This git-repository contains the sources of the static-web-site psychopo_. The goal of this website is to propose easily podcats and playlists.

.. _psychopo: https://vvv.psychopo.ovh


Getting Started
===============

::

  git clone https://github.com/charlyoleg/psychopo
  cd psychopo
  npm install
  npm run


Underlying Technologies
=======================

Pug_ and 11ty_.

.. _Pug: https://pugjs.org
.. _11ty: https://www.11ty.dev/


Using git-lfs
=============

Install git-lfs::

  sudo apt install git-lfs
  git lfs install # to be run once on each user account


git-lfs usage::

  git lfs track '*.mp3'
  git lfs track 'src/drawings/*.png'
  git lfs track 'src/drawings/*.jpg'
  git lfs track '*.pdf'
  git lfs untrack '*.pdf'
  cat .gitattributes
  git add .gitattributes
  git commit -m "tracking certain large files"
  git lfs status
  git add src/drawings
  git status
  git lfs status
  git lfs ls-files
  git commit -m 'adding some large files with lfs'
  git status
  git lfs status
  git lfs ls-files
  git push
  git status
  git lfs status
  git lfs ls-files


Notice that the files that you want to track with *git-lfs* should not be listed in your *.gitignore*.


