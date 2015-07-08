
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#

#
# BUILD
#

build:
	@cat css/themify-icons.css js/ll-canvas.css css/styles.css > css/ll-combined.css
#	@recess css/ll-combined.css --compress > css/ll-combined.min.css
	@cat js/device.min.js js/Detector.js > js/ll-header-combined.js
#	@uglifyjs js/ll-header-combined.js -nc > js/ll-header-combined.js
	@echo "${CHECK} Done"
