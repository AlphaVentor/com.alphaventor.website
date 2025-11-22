package com.alphaventor.website;

import com.s8.meta.modular.S8Module;

/**
 * 
 */
public class AlphaWebsite {
	
	public final static String ANCHOR = "hello";

	public final static S8Module MODULE = new S8Module("Alpha-website", params -> {
		params.setWebAssets("/Users/pc/qx/git/com.alphaventor.website");
		params.showWebAssetsLoading();
	});
}
