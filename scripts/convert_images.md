# Fixing file sizes of images

## Adjust size

```fish
for file in ./*
    magick $file -resize 50% $file
end
```

## Adjust quality

```fish
for file in ./* 
    magick $file -quality 35% $file 
end
```

## Rename images in folder

```console
$: bash
$: ../../scripts/batch_rename.sh {SLIDE NUMBER OF NEW IMAGE}
$: mv {NEW_IMAGE} ./{SLIDE_NUMBER_OF_NEW_IMAGE}
```
