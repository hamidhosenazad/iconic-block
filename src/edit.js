/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { alignment, label, rel, title, htmlAnchor } = attributes;
	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( { alignment: newAlignment } );
	};
	const onChangeLabel = ( newLabel ) => {
		setAttributes( { label: newLabel } );
	};
	const onChangeRel = ( newRel ) => {
		setAttributes( { rel: newRel } );
	};
	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};
	const onChangeHtmlAnchor = ( newHtmlAnchor ) => {
		setAttributes( { htmlAnchor: newHtmlAnchor } );
	};
	return (
		<>
			<InspectorControls group="settings">
				<PanelBody>
					<TextControl
						label={ __( 'Label', 'iconic-block' ) }
						value={ label || '' }
						onChange={ onChangeLabel }
						help={ __(
							'Briefly describe the icon to help screen reader users.',
							'Iconic-block'
						) }
					/>
					<TextControl
						label={ __( 'REL', 'iconic-block' ) }
						value={ rel || '' }
						onChange={ onChangeRel }
						help={ __(
							'Rel attribute for the icon',
							'Iconic-block'
						) }
					/>
					<TextControl
						label={ __( 'TITLE', 'iconic-block' ) }
						value={ title || '' }
						onChange={ onChangeTitle }
						help={ __(
							'Describe the role of this icon on the page',
							'Iconic-block'
						) }
					/>
					<TextControl
						label={ __( 'HTML ANCHOR', 'iconic-block' ) }
						value={ htmlAnchor || '' }
						onChange={ onChangeHtmlAnchor }
						help={ __(
							'Enter a word or two — without spaces — to make a unique web address just for this block, called an “anchor.” Then, you’ll be able to link directly to this section of your page',
							'Iconic-block'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody>
					<TextControl
						label={ __( 'HTML ANCHOR', 'iconic-block' ) }
						value={ htmlAnchor || '' }
						onChange={ onChangeHtmlAnchor }
						help={ __(
							'Enter a word or two — without spaces — to make a unique web address just for this block, called an “anchor.” Then, you’ll be able to link directly to this section of your page',
							'Iconic-block'
						) }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>
			<div
				{ ...useBlockProps( {
					className: `wp-block-iconic-block wp-block-iconic-block-align-${ alignment }`,
				} ) }
				title={ label }
			>
				<p>{ __( 'Pick an icon from the library', 'iconic-block' ) }</p>
				<button className="wp-block-iconic-block-button">
					{ __( 'Icon Library', 'iconic-block' ) }
				</button>
			</div>
		</>
	);
}
