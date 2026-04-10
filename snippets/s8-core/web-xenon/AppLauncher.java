

public class AppLauncher {

	
	/**
	 * 
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		
			
		XeCodebase codebase = new XeCodebase(
				new Class<?>[] { PalmUser.class }, 
				new Class<?>[] { PalmSpace.class }, 
				new Class<?>[] { 
					R2TurbineProject.class,
					App2ProjectModel.class,
					VtolProjectModel.class, 
					VtkProject.class });
		
		
		XeBoot[] boots = new XeBoot[] {
				new AlphaXeMainBoot()
		};
		
		
		String configPathname =  "....app-dev-pc3.xml";
		//String configPathname =  args[0];
		
		XeWebServer server = XeWebServer.build(codebase, boots, configPathname);
		server.start();
	}

}
