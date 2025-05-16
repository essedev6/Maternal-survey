import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip as BootstrapTooltip } from 'react-bootstrap';
import '../../styles/Tooltip.css';

const Tooltip = ({ contentKey, placement = 'top', children }) => {
  const [show, setShow] = useState(false);
  const [content, setContent] = useState(null);

  const loadContent = async () => {
    try {
      // Dynamic import of research content
      const { default: researchContent } = await import('../../utilis/ResearchContent');
      setContent(researchContent[contentKey]);
    } catch (error) {
      console.error('Failed to load tooltip content:', error);
    }
  };

  const handleMouseEnter = () => {
    loadContent();
    setShow(true);
  };

  const renderTooltip = (props) => (
    <BootstrapTooltip {...props}>
      {content ? (
        <div className="research-tooltip">
          <div className="tooltip-content">{content.text}</div>
          <div className="tooltip-citation">Source: {content.citation}</div>
        </div>
      ) : (
        <div>Loading research information...</div>
      )}
    </BootstrapTooltip>
  );

  return (
    <OverlayTrigger
      placement={placement}
      show={show}
      onToggle={setShow}
      overlay={renderTooltip}
      delay={{ show: 250, hide: 100 }}
    >
      <span 
        className="tooltip-trigger"
        onMouseEnter={handleMouseEnter}
      >
        {children || (
          <span className="tooltip-icon">
            <i className="fas fa-info-circle"></i>
          </span>
        )}
      </span>
    </OverlayTrigger>
  );
};

Tooltip.propTypes = {
  contentKey: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.node
};

export default Tooltip;