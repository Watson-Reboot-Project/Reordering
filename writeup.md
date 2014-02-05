Book Element Re-Ordering and Re-Numbering
=========================================
Tommy Bozeman - 2014/01/28
--------------------------

In the current state of the Watson Reboot Project, there are a number of
chapters, which each have a number of sections and figures. Each of these
chapters are numbered by the order in which they appear, as are the sections
and figures within them. To this point, that ordering and numbering have been
static, but it has recently been decided that it would be benificial to be able
to re-order these elements, and to have the numbering dynamically update.

## Requirements

1. There shall be an xml file at the root of the Watson Reboot Project file
   hierarchy containing (at minimum) a list of the chapters of the text book.

  1. The chapters within the root xml file will each be identified by a unique
     chapter title, without numbering.

  2. The chapters within the text will be ordered based upon the ordering of
     the chapters within the root xml file, and will be numbered based on that
     ordering.

2. There shall be an xml file at the root of each text book chapter file
   hierarchy containing (at minimum) a list of the sections and figures.

  1. The sections will each be identified within the chapter xml file by a
     unique section title, without numbering.

  2. The sections within the text will be ordered based upon the ordering of the
     sections within the chapter xml file, and will be numbered based on that
     ordering.

  3. The section numbering will reset at one at the beginning of each chapter.

  4. The sections within the chapter xml file will each contain (at minimum) a
     list of figures within the chapter.

  5. The figures within the chapter xml file will each be identified by a
     unique figure title, without numbering.

  6. The figures within the text will be ordered based upon the ordering of the
     figures within the chapter xml file, and will be numbered based on that
     ordering.

  7. The figure numbering will reset at one at the beginning of each chapter.
     They will not reset at the beginning of each section.
