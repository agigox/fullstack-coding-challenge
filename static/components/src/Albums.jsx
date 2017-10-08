
import React from 'react';
import {render} from 'react-dom';

class Albums extends React.Component {

	constructor() {
		super();
		this.state = {
			photos: [],
			loading: false
		}
	}
	componentDidMount() {

    FB.init({
      appId      : '121774878488049',
      channelUrl : 'http://localhost:3000',
      status     : true,
      cookie     : true,
      xfbml      : true
    });
    this.getPhotos( ( photos ) => {
      console.log( photos );
      this.setState({
      	photos: photos,
      	loading: true
      });
    });   
	}
	login(callback ) {
    FB.login((response) => {
      if (response.authResponse) {
        //console.log('Welcome!  Fetching your information.... ');
        if (callback) {
          callback(response);
        }
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    },{scope: 'email, user_photos'});
  }
  getAlbums( callback ) {
    FB.api(
      '/me/albums',
      {fields: 'id,cover_photo,name'},
      (albumResponse) => {
          if (callback) {
            callback(albumResponse);
          }
      }
    );
  }
  getPhotosForAlbumId(n, albumId, callback ) {
    FB.api(
      '/'+albumId+'/photos',
      {fields: 'id'},
      (albumPhotosResponse) => {
        //console.log( ' got photos for album ' + albumId );
        if (callback) {
          callback(n,  albumId, albumPhotosResponse );
        }
      }
    );
  }   
  getPhotos(callback) {
    var allPhotos = [];
    var accessToken = '';
    this.login((loginResponse) => {
      accessToken = loginResponse.authResponse.accessToken || ''; 
      this.getAlbums((albumResponse) => {
          var i, j, album, deferreds = {}, listOfDeferreds = [];

          for (j = 0; j < albumResponse.data.length; j++) {
            album = albumResponse.data[j];
            var n = album.name;
            deferreds[album.id] = $.Deferred();
            listOfDeferreds.push( deferreds[album.id] );
            console.log( ' got albums ',  n);
            this.getPhotosForAlbumId(n, album.id, (n, albumId, albumPhotosResponse ) => {
                var i, facebookPhoto;
                for (i = 0; i < albumPhotosResponse.data.length; i++) {
                  facebookPhoto = albumPhotosResponse.data[i];
                  allPhotos.push({
                    'name': n,
                    'id'  : facebookPhoto.id,
                    'added' : facebookPhoto.created_time,
                    'url' : 'https://graph.facebook.com/' + facebookPhoto.id + '/picture?access_token=' + accessToken
                  });
                }
                deferreds[albumId].resolve();
              });
          }

          $.when.apply($, listOfDeferreds ).then( () => {
            if (callback) {
              callback( allPhotos );
            }
          }, ( error ) => {
            if (callback) {
              callback( allPhotos, error );
            }
          });
        });
    });
  }
	render () {
		if (!this.state.loading) {
			return (
				<div>Loading...</div>
			);
		}
    let {photos} = this.state;
    let result = photos.reduce( (r, a) => {
        r[a.name] = r[a.name] || [];
        r[a.name].push(a);
        return r;
    }, Object.create(null));

    
    let elt = Object.keys(result).map((key,index) => {
      let p = result[key];
      console.log(index);
      return (
        <div>
          <div key={index}>{key}


          {p.map((e, i) => {
            return (
              <div>
                <div key={i}>
                <img />
                </div>
              </div>
            );

          })}
          </div>
        </div>
      ); 
    });

    
    
    return (
    	<div>
        
    	</div>
    );
	}
}

export default Albums;