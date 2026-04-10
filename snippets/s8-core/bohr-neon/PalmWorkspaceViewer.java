


	private void initialize() {
		if(!isInitialized) { 
			
			/* <page> */
			page = new SimplePage(front);

			List<S8WebObject> pageObjects = new ArrayList<>();
			
			
			/* <header> */
			GsHeader header = new GsHeader(front);
			
			/* <topbar> */
			topbar = new Topbar(front);
			TopbarImageButton imageButton = new TopbarImageButton(front);
			imageButton.setImageURL("/logos/alphaventor-logo.png");
			
			PalmBreadcrumbs breadcrumbs = new PalmBreadcrumbs(front);
			breadcrumbs.setItems(new PalmBreadcrumbsNode[] {
					PalmBreadcrumbsNode.create(front, SVG_CarbideIcon.home, "Workspace")
			});

			TopbarIconTextButton button1 = TopbarIconTextButton.create(front, SVG_CarbideIcon.sync, "Sync");
			TopbarIconTextButton button2 = TopbarIconTextButton.create(front, SVG_CarbideIcon.save, "Save");

			topbar.setLeftElements(imageButton, breadcrumbs, button1, button2);

			P8MenuIcon p8Menu = P8MenuIcon.create(front);
			topbar.setRightElements(p8Menu);
			
			header.setTopbar(topbar);
			/* </topbar> */
			
			/* <navbar> */

			TopNavbar navbar = new TopNavbar(front, CarbideSize.LARGE);

			TopNavbarMenu branchesMenu = new TopNavbarMenu(front, SVG_CarbideIcon.fork, "Home");
			TopNavbarMenu collaboratorsMenu = new TopNavbarMenu(front, SVG_CarbideIcon.repo, "Repositories");
			TopNavbarMenu actionsMenu = new TopNavbarMenu(front, SVG_CarbideIcon.person, "Team");
			TopNavbarMenu settingsMenu = new TopNavbarMenu(front, SVG_CarbideIcon.gear, "Settings");

			List<TopNavbarMenu> navbarMenus = new ArrayList<>();
			navbarMenus.add(branchesMenu);
			navbarMenus.add(collaboratorsMenu);
			navbarMenus.add(actionsMenu);
			navbarMenus.add(settingsMenu);
			navbar.setMenus(navbarMenus);
			navbar.setSelectedIndex(1);
			
			header.setNavbar(navbar);
			/* </navbar> */
			
			pageObjects.add(header);
			/* </header> */
			
			
			/* <body> */
			GsBody body = new GsBody(front);
			grid = new WorkspaceGrid(front);
			
			body.setElements(grid);
			pageObjects.add(body);
			/* </body> */
			
			page.setElements(pageObjects);
			isInitialized = true;
		}	
	}
	