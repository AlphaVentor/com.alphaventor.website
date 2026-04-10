public void view(S8AsyncFlow flow) {
		
    flow.runBlock(0, () -> {
        initialize();
    });

    /* <refresh> */
    flow.accessSpace(new AccessSpaceS8Request(flow.getMySpaceId(), false) {

        @Override
        public void onFailed(Exception exception) {
            exception.printStackTrace();
        }

        @Override
        public void onAccessed(Status status, Object[] objects) {
            if(status == Status.OK) {
                
                /* retrive space */
                PalmSpace space = (PalmSpace) objects[0];
                
                /* refresh space */
                refresh(space);
                
                /* publish */
                page.publish();
            }
            else {
                System.out.println("[WorkspaceViewer] error due to: "+status);
            }
        }
    });
    
    flow.send();
}