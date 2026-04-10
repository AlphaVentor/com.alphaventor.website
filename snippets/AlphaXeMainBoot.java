public class AlphaXeMainBoot implements XeBoot {
	
	@Override
	public String getName() {
		return XeRequestSyntax.MAIN_BOOT_PAGE;
	}


	@Override
	public void boot(S8WebFront front, S8AsyncFlow flow) throws Exception {
		
		
		InboardScreen screen =  new InboardScreen(front);
		
		DynamicMeshBackground meshScreen = new DynamicMeshBackground(front);
		screen.setBackground(meshScreen);
		
		
		Inboard inboard = new Inboard(PalmUser.USERS_TABLE_ID,
				"https://alphaventor.com/graphics/alphaventor%20logo%20-256px%20-white%20gen3.2.png",
				"AlphaVentor") {
			
			@Override
			public void onLogInSucceed(S8WebFront front, S8AsyncFlow flow, S8User user) {
				flow.setMe(user);
				displayHomeScreen(front, flow);
			}

			@Override
			public void onSignUpSucceed(S8WebFront front, S8AsyncFlow flow, String username, String password) {
				System.out.println("\nSIGN-UP --> username:"+username+", password:"+password);
			}
		};
		inboard.getLoginModule().start(front);
		screen.setModalBox(inboard.getBox(front));
		
		
		screen.vertex.expose(0);
		
		flow.send();
	}
	
	
	public void displayHomeScreen(S8WebFront front, S8AsyncFlow flow) {
		AlphaFeed feed = new AlphaFeed();
		PalmWorkspaceViewer workspaceViewer = new PalmWorkspaceViewer(feed, front);
		workspaceViewer.view(flow);
	}
	
}