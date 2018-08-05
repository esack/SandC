import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import LinkBox from './link-box';

const LinkBoxes = ({ title, link, linkTitle, buttonTitle, onClick, boxLinks,
  noBoxLinksMessage, loadnig, showButtons, showDelete, link2, linkTitle2
}) => (
  <div className="box">
    <div className="box-header with-border">
      <h3 className="box-title">{title}</h3>
      {
        (showButtons == undefined || showButtons) && link != undefined ?
          <Link style={{ margin: '0 0 0 10px' }} className="btn  btn-info btn-flat"
            to={link}>{linkTitle}</Link> : null
      }
      {
        (showButtons == undefined || showButtons) && buttonTitle != undefined ?
          <div style={{ margin: '0 0 0 10px' }} onClick={onClick}
            className="btn  btn-info btn-flat">{buttonTitle}</div> : null
      }
      {
        (showButtons == undefined || showButtons) && link2 != undefined ?
          <a style={{ margin: '0 0 0 10px' }} className="btn  btn-info btn-flat"
            href={link2}>{linkTitle2}</a> : null
      }
      <div className="box-tools pull-right">
        <button type="button" className="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse">
          <i className="fa fa-minus"></i></button>
      </div>
    </div>
    <div className="box-body">
      {
        boxLinks.length > 0 ? boxLinks.map((boxLink, i) =>
          <LinkBox showDelete={showDelete} key={i} name={boxLink.name} description={boxLink.description} fileContainer={boxLink.fileContainer}
            style={boxLink.backgroundColor != undefined ? { backgroundColor: boxLink.backgroundColor } : undefined} client={boxLink.client}
            link={boxLink.link} addClass="bg-light-gray" token={boxLink.token} icon={boxLink.icon} />) : loadnig ? "Loading..." : noBoxLinksMessage}
    </div>
  </div>
);

LinkBoxes.propTypes = {
  boxLinks: PropTypes.array.isRequired,
  noBoxLinksMessage: PropTypes.string.isRequired,
  loadnig: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
  linkTitle: PropTypes.string,
  link2: PropTypes.string,
  linkTitle2: PropTypes.string,
  onClick: PropTypes.func,
  buttonTitle: PropTypes.string,
  showButtons: PropTypes.bool,
  showDelete: PropTypes.bool
};

export default LinkBoxes;
