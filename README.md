# node v6 SoundCloud player

## Dependencies
- Red Hat Linux
- node v6
- sox with mp3 support

## Installing

if you already have SoX installed form yum you need remove it

```
su -c'yum remove sox'
```

install dependencies:
```
su -c'yum install gcc-c++ libid3tag libid3tag-devel flac-devel libvorbis-devel alsa-lib-devel libtool'
```

create src dir
```
mkdir ~/src && cd ~/src
```

download, extract, compile and install `libmad`

```
wget https://sourceforge.net/projects/mad/files/libmad/0.15.1b/libmad-0.15.1b.tar.gz &&
tar xf libmad-0.15.1b.tar.gz &&
wget http://www.linuxfromscratch.org/patches/blfs/svn/libmad-0.15.1b-fixes-1.patch &&
cd libmad-0.15.1b &&
patch -Np1 -i ../libmad-0.15.1b-fixes-1.patch &&
sed "s@AM_CONFIG_HEADER@AC_CONFIG_HEADERS@g" -i configure.ac &&
touch NEWS AUTHORS ChangeLog &&
autoreconf -fi &&
./configure --prefix=/usr --disable-static &&
make -j2 &&
su -c'make install' &&
ldconfig &&
cd ..
```

download, extract, compile and install `lame`

```
wget http://downloads.sourceforge.net/project/lame/lame/3.99/lame-3.99.5.tar.gz &&
tar xf lame-3.99.5.tar.gz &&
cd lame-3.99.5 &&
./configure &&
make -j2 &&
su -c'make install' &&
ldconfig &&
cd ..
```

download, extract, compile and install `sox`

```
wget http://downloads.sourceforge.net/project/sox/sox/14.4.2/sox-14.4.2.tar.bz2 &&
tar xf sox-14.4.2.tar.bz2 &&
cd sox-14.4.2 &&
./configure &&
make -j2 &&
su -c'make install' &&
cd ..
```

set LD_LIBRARY_PATH

```
echo "export LD_LIBRARY_PATH=/usr/lib:$LD_LIBRARY_PATH" | tee -a ~/.bashrc &&
source ~/.bashrc
```

run app

```
node index.js
```
