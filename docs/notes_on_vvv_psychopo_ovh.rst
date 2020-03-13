=================
Notes on Psychopo
=================


Presentation
============

The repository *psychopo* contains the sources of the website psychopo_.

.. _psychopo: http://vvv.psychopo.ovh

The *mp3* and *pdf* are files are registered in *git-lfs* because they are too big.


Technical notices
=================

This sources uses eleventy_ and pug_. Unfortunately, *eleventy* with *pug* is not yet fully mature. In particular the following features don't work properly:

- *permalink* of *pagination*
- *pug includes* but *pug layout includes* works
- *data config file* when not used in context of *pagination*


.. _eleventy: https://www.11ty.dev
.. _pug: https://pugjs.org


Actually, *eleventy* is just a replacement for::

  pug --pretty -O _data/audio_lists.js --out tmp index.pug

For pagination, *eleventy* also offers the split of data/files.


Technical explanations
======================

Transformation pipe::

  audio/xyz/xyz_list.json > src/_data/audio_list.js > eleventy > pug > html


Linux commands
==============

Save place on your hard-disk
----------------------------

Check duplicated files even after you have renamed them::

  du -sh ~/Downloads
  find ~/Downloads -type f -exec md5sum {} + | sort -k 1 > dir1.txt
  find ~/Downloads -type f -iname "*.mp3" -exec md5sum {} + | sort -k 1 > dir1.txt
