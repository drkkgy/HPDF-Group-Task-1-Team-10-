import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  },
};

const tilesData = [
  {
    img:'adad.jpg',
    title: 'Name',
    author: '# Mutual Friends',
  },
  {
    img: 'adad.jpg',
    title: 'Name',
    author: '# Mutual Friends',
  },
  {
    img: 'adad.jpg',
    title: 'Name',
    author: '# Mutual Friends',
  },
  {
    img:'adad.jpg',
    title: 'Name',
    author: '# Mutual Friends',
  },
  {
    img: 'adad.jpg',
    title: 'Name',
    author: '# Mutual Friends',
  },
  {
    img: 'adad.jpg',
    title: 'Name',
    author: '# Mutual Friends',
  },


];

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
const Friends = () => (
  <div style={styles.root}>
    <div id="fb"><a href=""><h4>Friends</h4></a></div>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >

      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span><b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>
</div>
);

export default Friends;
