#!/bin/bash

rm -rf tiles

case $1 in
  mpz)
    ../gdal2tiles-multiprocess.py -l -p raster -z 0-6 -w none STSCI-H-p1917b-f-20791x19201.tif tiles
    ;;
  mp)
    ../gdal2tiles-multiprocess.py -l -p raster -w none STSCI-H-p1917b-f-20791x19201.tif tiles
    ;;
  z)
    ../gdal2tiles.py -l -p raster -w none STSCI-H-p1917b-f-20791x19201.tif -z 0-6 tiles
    ;;
  *)
    ../gdal2tiles.py -l -p raster -w none STSCI-H-p1917b-f-20791x19201.tif tiles
    ;;
esac
