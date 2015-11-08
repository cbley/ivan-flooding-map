# Flooding imagery from 2004 storm Ivan

In mid-September 2004, Pennsylvania was hit by Tropical Depression Ivan, or as
it became known, Ivan the Terrible. This storm resulted in damage across 56
counties primarily because of flooding along streams and rivers. More than six 
inches of rain fell across parts of the state, with more than nine inches in
some areas.

PEMA authorized aerial imagery photography missions to document the damages and
impact of flooding. This included the area of the Susquehanna River basin shown
on this map. The digital orthophotographs were downloaded from [PASDA](http://www.pasda.psu.edu/uci/FullMetadataDisplay.aspx?file=paivanflood2004.xml)
and processed with GDAL to display on this web map.

For reference and comparison, imagery from USDA's [NAIP](http://www.fsa.usda.gov/programs-and-services/aerial-photography/imagery-programs/naip-imagery/) 
dataset from 2005 was used, also downloaded from [PASDA](http://www.pasda.psu.edu/uci/MetadataDisplay.aspx?entry=PASDA&file=NAIP_CountyMosaics2005.xml&dataset=1109).

The basic imagery workflow was:

orthos ➡️ gdalbuildvrt ➡️ gdalwarp ➡️ gdal2tiles.py ➡️ AWS S3

The tiles are displayed on a leaflet map with a swipe control adopted from this [Mapbox blog post](https://www.mapbox.com/blog/swipe-layers/)
which provides a nice, simple way to visualize the difference between the
two layers. Additionally,  there's a river boundary GeoJSON simplified from the data 
available from the USGS's [National Hydrology Dataset](http://nhd.usgs.gov/) to give
a sense of where the river banks were pre-flood.

![Swipe preview](http://i.imgur.com/wmVOlHG.gif)
