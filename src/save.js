import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { alignment } = attributes;
	return (
		<p
			{ ...useBlockProps.save( {
				className: `wp-block-iconic-block wp-block-iconic-block-align-${ alignment }`,
			} ) }
		>
			{ 'Iconic Block – hello from the saved content!' }
		</p>
	);
}
